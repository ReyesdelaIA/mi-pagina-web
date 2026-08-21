# Servidor de revisión local del Programa Copilot.
#
# Hace dos cosas que el `python3 -m http.server` pelado no hace:
#   1. Prohíbe cachear. Sin Cache-Control, Chrome se guarda el HTML y el JS por
#      su cuenta y parece que los cambios no salen.
#   2. Aplica los mismos rewrites que vercel.json, para que las rutas limpias
#      (/programa-copilot, /programa-copilot/taller-1, /taller01-general) se
#      comporten igual que en producción.
import http.server, json, os, re

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def rewrites():
    with open(os.path.join(RAIZ, 'vercel.json')) as f:
        reglas = json.load(f).get('rewrites', [])
    return [(re.compile('^' + re.sub(r':(\w+)', r'(?P<\1>[^/]+)', r['source']) + '/?$'),
             r['destination']) for r in reglas]

REGLAS = rewrites()

class Local(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        limpio = path.split('?', 1)[0]
        for patron, destino in REGLAS:
            m = patron.match(limpio)
            if m:
                path = destino.format(**m.groupdict()) if m.groupdict() else destino
                break
        return super().translate_path(path)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

os.chdir(RAIZ)
print('Revisión local en http://localhost:8902/programa-copilot')
http.server.ThreadingHTTPServer(('127.0.0.1', 8902), Local).serve_forever()
