
Ferramenta de Sorteio (Kick + Twitch) v2.0
Uma ferramenta de sorteio front-end, baseada em navegador, projetada para streamers do Kick e da Twitch. Esta é uma versão atualizada e aprimorada (v2.0) do projeto original "kickaway".

Esta versão adiciona integração com a Twitch, um bot de anúncio, multiplicadores avançados, um timer de vencedor, suporte multilíngue e muito mais.

🇧🇷 Português (BR)
✨ Funcionalidades
Conexão Dupla: Conecta-se simultaneamente aos chats do Kick e da Twitch.

Entrada por Palavra-chave: Permite definir uma palavra-chave para entrar no sorteio (ou qualquer mensagem, se deixado em branco).

Multiplicadores de Sorte: Concede chances extras para Subs e VIPs em ambas as plataformas.

Modo de Entrada Dupla: Permite que um usuário entre uma vez pela Kick E uma vez pela Twitch.

Exclusão de Moderadores: Opção para impedir que moderadores participem do sorteio.

Anúncio do Vencedor: Bot da Twitch integrado para anunciar automaticamente o vencedor no chat.

Tela do Vencedor: Inclui um timer de contagem regressiva e um botão "Sortear Novamente" para prêmios múltiplos.

Multilíngue: Suporte completo para Inglês, Português (BR) e Espanhol, com detecção automática do idioma do navegador.

Sistema de Ajuda: Tooltips (?) explicam as funções mais complexas.

🚀 Como Usar
Hospedagem (Recomendado): Para melhores resultados, hospede os 3 arquivos (index.html, style.css, script.js) em um serviço gratuito como o GitHub Pages.

Uso Local: Alternativamente, apenas baixe os 3 arquivos e abra o index.html em seu navegador.

Conectar: Na tela inicial, digite os nomes dos seus canais (apenas o nome, ex: "gaules") e clique em "Conectar".

Configurar: Na tela principal, ajuste suas configurações (palavra-chave, multiplicadores, timer, etc.).

Iniciar: Clique em "Iniciar Sorteio" (Start Giveaway). Isso abre as inscrições e o programa começará a ler o chat.

Sortear: Quando estiver pronto, clique em "Sortear Vencedor" (Draw Winner).

🤖 Configurando o Bot da Twitch (Obrigatório para Anúncios)
Para que o bot anuncie o vencedor no seu chat, você precisa configurá-lo:

Crie uma Conta de Bot: Crie uma conta nova no Twitch que servirá como seu bot (ex: "MeuCanalBot").

Ative o 2FA: Na sua conta de bot, vá em Configurações -> Segurança e ative a Autenticação de Dois Fatores (2FA).

Gere um Token: Logado como seu bot, visite twitchtokengenerator.com. Gere um "Access Token" (Token de Acesso).

Preencha no Sorteador:

Twitch Bot Username: O nome da sua conta de bot (ex: "MeuCanalBot").

Twitch Bot OAuth Token: O token que você acabou de gerar. IMPORTANTE: Você deve adicionar oauth: na frente dele.

Exemplo: oauth:abcdef1234567890

Mensagem: Configure sua mensagem de anúncio. Use as variáveis {winner} (nome do vencedor) e {platform} (plataforma de onde ele veio).

Salve: Clique em "Salvar Configurações".

📄 Créditos
Versão atualizada do projeto kickaway (github) por darcherman v2.0

🇺🇸 English (EN)
✨ Features
Dual Connection: Connects simultaneously to Kick and Twitch chats.

Keyword Entry: Set a keyword to enter the giveaway (or any message, if left blank).

Luck Multipliers: Grants extra chances to Subs and VIPs on both platforms.

Dual Entry Mode: Allows a user to enter once from Kick AND once from Twitch.

Moderator Exclusion: Option to prevent moderators from participating in the draw.

Winner Announcement: Integrated Twitch Bot to automatically announce the winner in chat.

Winner Screen: Includes a countdown timer and a "Draw Again" button for multiple prizes.

Multi-language: Full support for English, Portuguese (BR), and Spanish, with auto-detection of browser language.

Help System: Tooltips (?) explain the more complex functions.

🚀 How to Use
Hosting (Recommended): For best results, host the 3 files (index.html, style.css, script.js) on a free service like GitHub Pages.

Local Use: Alternatively, just download the 3 files and open index.html in your browser.

Connect: On the login screen, enter your channel names (just the name, e.g., "xqc") and click "Connect".

Configure: On the main screen, adjust your settings (keyword, multipliers, timer, etc.).

Start: Click "Start Giveaway". This opens the entries, and the program will begin reading the chat.

Draw: When ready, click "Draw Winner".

🤖 Setting up the Twitch Bot (Required for Announcements)
For the bot to announce the winner in your chat, you must configure it:

Create a Bot Account: Create a new Twitch account to serve as your bot (e.g., "MyChannelBot").

Enable 2FA: On your bot account, go to Settings -> Security and enable 2-Factor Authentication (2FA).

Generate Token: While logged in as your bot, visit twitchtokengenerator.com. Generate an "Access Token".

Fill in the Tool:

Twitch Bot Username: Your bot account's name (e.g., "MyChannelBot").

Twitch Bot OAuth Token: The token you just generated. IMPORTANT: You must add oauth: to the front of it.

Example: oauth:abcdef1234567890

Message: Configure your announcement message. Use the variables {winner} (winner's name) and {platform} (the platform they won from).

Save: Click "Save All Settings".

📄 Credits
Updated version of the kickaway (github) project by darcherman v2.0

🇪🇸 Español (ES)
✨ Funcionalidades
Conexión Dual: Se conecta simultáneamente a los chats de Kick y Twitch.

Entrada por Palabra Clave: Permite definir una palabra clave para entrar en el sorteo (o cualquier mensaje, si se deja en blanco).

Multiplicadores de Suerte: Otorga oportunidades adicionales a Subs y VIPs en ambas plataformas.

Modo de Entrada Doble: Permite que un usuario entre una vez desde Kick Y una vez desde Twitch.

Exclusión de Moderadores: Opción para evitar que los moderadores participen en el sorteo.

Anuncio del Ganador: Bot de Twitch integrado para anunciar automáticamente al ganador en el chat.

Pantalla de Ganador: Incluye un temporizador de cuenta regresiva y un botón "Sortear de Nuevo" para múltiples premios.

Multilenguaje: Soporte completo para Inglés, Portugués (BR) y Español, con autodetección del idioma del navegador.

Sistema de Ayuda: Tooltips (?) explican las funciones más complejas.

🚀 Cómo Usar
Alojamiento (Recomendado): Para obtener los mejores resultados, aloja los 3 archivos (index.html, style.css, script.js) en un servicio gratuito como GitHub Pages.

Uso Local: Alternativamente, simplemente descarga los 3 archivos y abre index.html en tu navegador.

Conectar: En la pantalla inicial, introduce los nombres de tus canales (solo el nombre, ej: "ibai") y haz clic en "Conectar".

Configurar: En la pantalla principal, ajusta tu configuración (palabra clave, multiplicadores, temporizador, etc.).

Iniciar: Haz clic en "Iniciar Sorteo" (Start Giveaway). Esto abre las inscripciones y el programa comenzará a leer el chat.

Sortear: Cuando estés listo, haz clic en "Sortear Ganador" (Draw Winner).

🤖 Configurando el Bot de Twitch (Obligatorio para Anuncios)
Para que el bot anuncie al ganador en tu chat, debes configurarlo:

Crear una Cuenta de Bot: Crea una cuenta nueva en Twitch que sirva como tu bot (ej: "MiCanalBot").

Activar 2FA: En tu cuenta de bot, ve a Configuración -> Seguridad y activa la Autenticación de Dos Factores (2FA).

Generar Token: Con la sesión iniciada como tu bot, visita twitchtokengenerator.com. Genera un "Access Token" (Token de Acceso).

Rellenar en la Herramienta:

Twitch Bot Username: El nombre de tu cuenta de bot (ej: "MiCanalBot").

Twitch Bot OAuth Token: El token que acabas de generar. IMPORTANTE: Debes añadir oauth: al principio.

Ejemplo: oauth:abcdef1234567890

Mensaje: Configura tu mensaje de anuncio. Usa las variables {winner} (nombre del ganador) y {platform} (la plataforma desde donde ganó).

Guardar: Haz clic en "Guardar Configuración".

📄 Créditos
Versión actualizada del proyecto kickaway (github) por darcherman v2.0
