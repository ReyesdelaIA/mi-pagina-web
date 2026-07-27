---
name: afiche-cliente
description: Crea o actualiza el afiche/espejo en vivo de un cliente (el que se manda como comunicación interna con las fechas, el lugar y el avance del programa). Invocar cuando Felipe diga "cliente nuevo", "hazme el afiche de X", "espejo para X", "el link del taller de X". El afiche vive en /taller/<token> y refleja en vivo lo que Felipe marca en su Panel de Clientes.
---

Genera el link del afiche en vivo de un cliente. El sistema ya está construido; esta skill es el checklist para no olvidar nada. Argumento opcional en `$ARGUMENTS`: el nombre del cliente.

## Qué es y cómo funciona (contexto)

- El afiche es una página pública de **solo lectura** en `https://reyesia.com/taller/<share_token>`.
- Los datos salen **en vivo** de la base del **Panel de Clientes** (Supabase, proyecto **reyes-finance**, id `lzrhpmwrbcrprsnpuadh`), vía el endpoint `/api/afiche?c=<token>`.
- El endpoint corre en el proyecto **Vercel `mi-pagina-web`** (el de reyesia.com) y usa la variable `REYES_FINANCE_SERVICE_KEY`. **Nunca** hay llaves en la página del cliente, y **nunca** se exponen los comentarios internos del panel.
- Cuando Felipe marca un tema en su panel, el afiche lo refleja en ~20s (caché del endpoint).

## Lo que necesito de Felipe (pídelo, agrupado)

La mayoría del contenido ya vive en su panel. Lo genuinamente manual:

1. **El cliente en el panel** — ¿ya existe en el Panel de Clientes con sus **fechas** y **temario** cargados? Si no, la forma rápida es que **duplique** un cliente parecido (ej. Lucas Maq para el pack de 3 talleres) y le ajuste fechas/nombre. También puedo crearlo por SQL si me pasa fechas y temario.
2. **El logo del cliente** — que lo adjunte (idealmente el wordmark a color sobre fondo claro).
3. **El lugar** — dónde será (ej. "En oficinas de Lucas Maq", "Vía Zoom", "En oficinas de Reyes IA").

No pidas fechas, programa, temario ni avance por separado: eso se lee del panel. Solo confírmalo.

## Pasos

### 1. Ubicar el cliente en la base
Busca en `programas_clientes` por nombre (o por el id si Felipe pasa el link del panel `.../panel-clientes#/cliente/<id>`):
```sql
select id, cliente, tipo, total_sesiones, share_token
from programas_clientes where cliente ilike '%<nombre>%';
```
- El `share_token` ya existe (se genera solo al crear el cliente, por trigger). Si por alguna razón es null, el `update ... set share_token = slug || '-' || 6hex` lo arregla.
- Si el cliente **no existe**, guía a Felipe a crearlo/duplicarlo en el panel, o créalo por SQL con las fechas y el temario que te dé.

### 2. Confirmar fechas y temario
```sql
select numero_sesion, fecha_hora, lugar from sesiones_cliente where programa_id='<id>' order by numero_sesion;
select numero_sesion, count(*) from temario_temas where programa_id='<id>' group by numero_sesion order by numero_sesion;
```
Si faltan fechas o temario, complétalos (el afiche los muestra tal cual).

### 3. Fijar el lugar
El afiche toma el lugar de `sesiones_cliente.lugar` (el primero no nulo). Si viene vacío:
```sql
update sesiones_cliente set lugar='<lugar>' where programa_id='<id>' and lugar is null;
```

### 4. Guardar el logo
- El afiche busca el logo por convención: `/panel-clientes/logos/<slug>.png`, donde `<slug>` = nombre del cliente en minúsculas, sin acentos, con guiones (ej. "Andes Logistic" → `andes-logistic`). Es el mismo slug que calcula el endpoint.
- Copia la imagen que mandó Felipe a `panel-clientes/logos/<slug>.png`. Si el logo es blanco (invisible sobre la caja blanca del afiche), pídele una versión a color u oscura.
- Si no hay logo, el afiche cae elegante a la inicial del nombre — no bloquea.

### 5. Nada que tocar del formato
- La **unidad** ("taller" vs "sesión") se infiere sola: `total_sesiones === 3` → *taller* (pack de 3); si es mentoría 1:1 o >3 sesiones → *sesión* (Adopción Profunda). No hay que configurar nada.
- El presentador (Felipe · Reyes IA + bio + logos de clientes) es fijo en el afiche.

### 6. Desplegar y entregar el link
```bash
git add panel-clientes/logos/<slug>.png
git commit -m "afiche(<slug>): logo del cliente"
git push origin main   # reyesia.com deploya desde main
```
- El link es: `https://reyesia.com/taller/<share_token>`.
- Felipe también lo tiene a un clic en su panel: entra a la ficha del cliente → botón **"🔗 Compartir afiche con el cliente"** → Copiar.

### 7. Verificar en vivo
```bash
curl -s "https://reyesia.com/api/afiche?c=<share_token>" | head -c 200   # debe traer {"cliente":...}
```
Y si hay dudas, cargar `reyesia.com/taller/<share_token>` y confirmar que la etiqueta diga **"Progreso en vivo"** (no "Al día de hoy") y que las fechas/lugar/temario se vean bien.

## Reglas
- **Nunca** exponer comentarios internos ni ninguna llave en la página del cliente (el endpoint ya lo garantiza; no lo rompas).
- **Nunca** pedirle la service key a Felipe por chat; esa ya está en Vercel.
- El afiche es de solo lectura: no escribe nada en la base.

## Archivos clave
- Página del afiche: `panel-clientes/afiche-demo.html` (lee token del path `/taller/<token>` o de `?c=`).
- Endpoint: `api/afiche.js`.
- Ruta bonita: en `vercel.json`, `"/taller/:token" → "/panel-clientes/afiche-demo.html?c=:token"`.
- Botón en el panel: función `compartirVista(token, btn)` en `panel-clientes/index.html`.
- Logos de clientes: `panel-clientes/logos/<slug>.png`.
