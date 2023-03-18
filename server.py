import os
import http.server
import socketserver

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # get the original translated path
        path = super().translate_path(path)

        # if it's a directory, return 404
        if os.path.isdir(path):
            self.send_error(404, "File not found")
            return None

        # only allow access to files with certain extensions
        allowed_extensions = ['.html', '.js', '.css', '.json', ',ico']
        if not any(path.endswith(ext) for ext in allowed_extensions):
            self.send_error(404, "File not found")
            return None

        # return the original path if it passed all the tests
        return path

with open("config.txt") as f:
    for line in f:
        line = line.strip()
        if line.startswith("port_number="):
            port_number = int(line.split("=")[1])

Handler = MyHandler

class MyServer(socketserver.TCPServer):
    def __init__(self, server_address, HandlerClass):
        super().__init__(server_address, HandlerClass)
        self.allow_reuse_address = True
        self.allow_cross_domain = True

with MyServer(("", port_number), Handler) as httpd:
    print("\nserving at port", port_number)
    httpd.serve_forever()
