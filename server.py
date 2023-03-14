import http.server
import socketserver

with open("config.txt") as f:
    for line in f:
        line = line.strip()
        if line.startswith("port_number="):
            port_number = int(line.split("=")[1])

Handler = http.server.SimpleHTTPRequestHandler

class MyServer(socketserver.TCPServer):
    def __init__(self, server_address, HandlerClass):
        super().__init__(server_address, HandlerClass)
        self.allow_reuse_address = True
        self.allow_cross_domain = True

with MyServer(("", port_number), Handler) as httpd:
    print("\nserving at port", port_number)
    httpd.serve_forever()
