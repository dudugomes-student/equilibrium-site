# Equilibrium Multi — site institucional

Reformulação do site da **Equilibrium Multi – Serviços de Saúde**, criada com React, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber, Drei, Framer Motion e Lucide React.

## Rodar localmente

Requer Node.js LTS.

```bash
npm install
npm run dev
```

Para testar a versão final: `npm run build` e `npm run preview`.

## Onde editar

- **Contatos, WhatsApp, CNPJ, endereço, redes sociais, endpoint do formulário e responsável técnico:** `src/config/company.ts`.
- **Serviços:** `src/data/services.ts`. Os itens atuais estão marcados como provisórios.
- **Textos:** arquivos em `src/sections/`.
- **Logotipo e imagens:** `public/images/`.
- **Cena 3D:** `src/components/3d/HeroScene.tsx`.
- **Modelos GLB/GLTF futuros:** coloque em `public/models/`, carregue com `useGLTF` e comprima com glTF Transform/Draco.
- **Cores e tipografia:** `tailwind.config.js` e `src/styles/index.css`.
- **Política provisória:** `src/pages/Privacy.tsx`.

## Formulário

Possui validação acessível, honeypot antispam, tempo mínimo de preenchimento e consentimento LGPD. Ele **não simula envio**: enquanto `proposalEndpoint` estiver nulo, a interface informa que falta conectar uma API e oferece e-mail e WhatsApp.

O endpoint deve aceitar `POST` em JSON. No servidor, implemente rate limit, CAPTCHA/Turnstile, validação, sanitização, política de retenção e envio autenticado de e-mail.

## Desempenho e acessibilidade

- Cena 3D carregada por `React.lazy` e `Suspense` em chunk separado;
- menos partículas, DPR reduzido e baixo consumo no celular;
- animação pausada quando a aba não está visível;
- `prefers-reduced-motion` e fallback sem WebGL;
- HTML semântico, link de salto, foco visível, `aria-live`, teclado e campos identificados.

## SEO

Metatags, Open Graph, canonical, JSON-LD, `robots.txt` e `sitemap.xml` estão configurados. Revise domínio e imagem social antes da publicação.

## Publicação

### Vercel ou Netlify

1. Envie o repositório ao GitHub e importe na plataforma.
2. Use `npm run build` e diretório de saída `dist`.
3. Configure domínio, HTTPS e fallback SPA para `/index.html`.

### Hospedagem tradicional

Execute `npm run build`, envie `dist/` ao diretório público e configure o servidor para devolver `index.html` nas rotas sem arquivo físico.

## Informações ainda necessárias

- Lista oficial e descrição dos serviços;
- cidades, estados e regiões atendidas;
- nome e conselho do responsável técnico;
- licenças, certificações, registros e protocolos;
- documentos institucionais;
- CNPJ e endereço;
- redes sociais oficiais;
- canal/encarregado de proteção de dados;
- texto jurídico definitivo da Política de Privacidade;
- URL da API do formulário;
- confirmação de que os dois números aceitam WhatsApp;
- imagem Open Graph definitiva e, se desejado, modelo 3D oficial otimizado.

Nenhuma especialidade, licença, certificação, cliente, número ou resultado não confirmado foi publicado.
