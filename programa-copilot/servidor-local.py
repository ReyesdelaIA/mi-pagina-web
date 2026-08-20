# Servidor de revisión local: prohíbe cachear, para que cada recarga traiga
# lo último. El http.server pelado no manda Cache-Control y Chrome se guarda
# el HTML y el JS por su cuenta, lo que hace parecer que los cambios no salen.
import http.server, functools, os
class SinCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma','no-cache')
        self.send_header('Expires','0')
        super().end_headers()
os.chdir('/Users/felipereyespolanco/mi-pagina-web')
http.server.ThreadingHTTPServer(('127.0.0.1',8902), SinCache).serve_forever()
