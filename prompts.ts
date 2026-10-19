import { intro, outro, spinner, confirm, text, password, select, isCancel } from "@clack/prompts";

intro("Virgílio: teste de interação");
const s = spinner();
s.start("Criando o ambiente de ensaio");
await new Promise((r) => setTimeout(r, 300));
s.stop("Ambiente de ensaio criado");
const ok = await confirm({ message: "Posso criar o projeto app-vibe-stg na organização RafaelME, São Paulo, plano Free?" });
const nome = await text({ message: "Nome do app" });
const senha = await password({ message: "Cole a senha do banco de produção" });
const org = await select({ message: "Qual organização é a do seu app?", options: [{ value: "a", label: "Kasa Digital" }, { value: "b", label: "RafaelME" }, { value: "c", label: "Tribie" }] });
outro("Fim");
console.log(JSON.stringify({ platform: `${process.platform}-${process.arch}`, ok, nome, senhaTamanho: isCancel(senha) ? "cancel" : String(senha).length, org }));
