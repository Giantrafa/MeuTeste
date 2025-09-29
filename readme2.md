# 💾 Backup do Vault do Obsidian com Git e GitHub

Este guia mostra como configurar o versionamento do seu vault do Obsidian com Git e salvar no GitHub.

---

## ✅ Pré-requisitos

- Git instalado: [https://git-scm.com/](https://git-scm.com/)
- Conta no GitHub: [https://github.com](https://github.com)

---

## 📁 1. Crie um repositório no GitHub

1. Acesse [https://github.com](https://github.com)
2. Clique em **New repository**
3. Dê um nome (ex: `meu-vault-obsidian`)
4. Marque como **privado** (opcional)
5. **Não adicione README, .gitignore ou licença**
6. Clique em **Create repository**

---

## 💻 2. Inicialize seu vault como repositório Git

Abra o terminal (ou Git Bash) e execute:

```bash
cd "Caminho/para/seu/vault"
git init
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
