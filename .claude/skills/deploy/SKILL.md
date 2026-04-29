---
name: deploy
description: Prepara y despliega reyesia.com a producción en Vercel. Usar cuando diga "deploy", "despliega", "sube a producción", "publica", o "pon esto en vivo".
---

# Deploy de reyesia.com a Vercel

## Pre-deploy checklist (seguir SIEMPRE en este orden)

1. Verificar que no hay errores de build corriendo npm run build. Si hay errores, corregirlos ANTES de continuar.

2. Revisar archivos modificados corriendo git status y mostrar al usuario qué archivos cambiaron.

3. Commitear cambios con git add . y git commit con un mensaje descriptivo en español.

4. Push a GitHub con git push. Vercel detecta el push y despliega automáticamente.

5. Informar al usuario que puede verificar en reyesia.com en 1-2 minutos.

## Reglas importantes
- NUNCA hacer git push --force
- Si el build falla, NO deployar, corregir primero
- Si hay conflictos en git, avisar al usuario antes de resolver
