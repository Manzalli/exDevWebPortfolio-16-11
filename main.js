
const dados = {
    curriculo: {
        metadados: {
            versao: "1.0",
            idioma: "pt-BR",
            ultimaAtualizacao: "2026-11-05"
        },

        informacoesPessoais: {
            nomeCompleto: "Gustavo Manzalli Cury Tozatto",
            foto: "./foto.JPEG",
            tituloProfissional: "Desenvolvedor Java",

            email: "gustavomanzalli68@gmail.com",
            telefone: "11 123456789",
            whatsapp: "11 123456789",

            localizacao: {
                cidade: "São Paulo",
                estado: "SP",
                pais: "Brasil"
            },

            linkedin: "https://www.linkedin.com/in/gustavo-manzalli",
            github: "https://github.com/Manzalli"
        },

        resumoProfissional: {
            anosDeExperiencia: 0,
            especializacaoPrincipal:
                "Java + Spring Boot + Hibernate/JPA + PostgreSQL + APIs REST",
            objetivoDeCarreira:
                "Desenvolvimento de sistemas com Java"
        },

        formacao: [
            {
                instituicao: "UNIPIAGET",
                curso: "Análise e Desenvolvimento de Sistemas",
                nivel: "Básico",
                dataInicio: "2/2026",
                dataFim: "7/2028",
                descricao: "Estudante de tecnologia"
            }
        ],

        habilidades: {
            tecnicas: [
                {
                    nome: "Programação Orientada a Objetos",
                    nivel: "Básico"
                }
            ]
        },

        cursos: [
            {
                nome: "Cloud AWS",
                instituicao: "Amazon",
                dataConclusao: "8/2026"
            }
        ]
    }
};

const curriculo = dados.curriculo;
const pessoa = curriculo.informacoesPessoais;

function vazio(valor) {
    return valor === "" || valor === null ||
        valor === undefined ||
        (Array.isArray(valor) && valor.length === 0);
}

function juntar(separador, ...partes) {
    return partes
        .filter(parte => !vazio(parte))
        .join(separador);
}

function periodo(inicio, fim, emAndamento) {
    return juntar(" - ", inicio, emAndamento ? "Atual" : fim);
}

function adicionarLinha(idCorpo, colunas) {

    if (colunas.every(coluna => vazio(coluna))) {
        return;
    }

    const corpo = document.getElementById(idCorpo);
    const linha = document.createElement("tr");

    for (let conteudo of colunas) {
        const celula = document.createElement("td");
        celula.textContent = conteudo;
        linha.appendChild(celula);
    }

    corpo.appendChild(linha);
}

function adicionarCampos(idCorpo, campos) {

    for (let par of campos) {
        if (!vazio(par[1])) {
            adicionarLinha(idCorpo, [par[0], par[1]]);
        }
    }
}

// CABEÇALHO

document.documentElement.lang = curriculo.metadados.idioma;

document.title = juntar(
    " - ",
    pessoa.nomeCompleto,
    "Currículo"
);

document.getElementById("nome").textContent =
    pessoa.nomeCompleto;

document.getElementById("titulo").textContent =
    pessoa.tituloProfissional;

document.getElementById("fotoPerfil").src =
    pessoa.foto;

// CONTATO

const local = pessoa.localizacao;

adicionarCampos("corpoContato", [
    ["E-mail", pessoa.email],
    ["Telefone", pessoa.telefone],
    ["WhatsApp", pessoa.whatsapp],
    [
        "Localização",
        juntar(", ", local.cidade, local.estado, local.pais)
    ],
    ["LinkedIn", pessoa.linkedin],
    ["GitHub", pessoa.github]
]);

// RESUMO PROFISSIONAL

const resumo = curriculo.resumoProfissional;

adicionarCampos("corpoResumo", [
    [
        "Anos de experiência",
        resumo.anosDeExperiencia > 0
            ? resumo.anosDeExperiencia + " ano(s)"
            : ""
    ],
    ["Especialização principal", resumo.especializacaoPrincipal],
    ["Objetivo de carreira", resumo.objetivoDeCarreira]
]);


for (let f of curriculo.formacao) {

    adicionarLinha("corpoFormacao", [
        f.instituicao,
        juntar(" - ", f.curso, f.areaDeEstudo),
        f.nivel,
        periodo(f.dataInicio, f.dataFim, f.emAndamento),
        f.descricao
    ]);
}


for (let habilidade of curriculo.habilidades.tecnicas) {

    adicionarLinha("corpoHabilidades", [
        habilidade.nome,
        habilidade.nivel
    ]);
}


for (let curso of curriculo.cursos) {

    adicionarLinha("corpoCursos", [
        curso.nome,
        curso.instituicao,
        curso.dataConclusao
    ]);
}


if (!vazio(curriculo.metadados.ultimaAtualizacao)) {

    document.getElementById("atualizacao").textContent =
        "Atualizado em " + curriculo.metadados.ultimaAtualizacao;
}

for (let secao of document.querySelectorAll("section")) {

    if (secao.querySelectorAll("tbody tr").length === 0) {
        secao.hidden = true;
    }
}
