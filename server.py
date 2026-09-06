#!/usr/bin/env python3
"""
PySparkle Web Server
Starts a local web server for the Python 101 interactive prototype.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    port = PORT
    for p in range(PORT, PORT + 20):
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                url = f"http://localhost:{p}"
                print("\n" + "=" * 60)
                print(f"🏛️  pyMinas — Facultad de Minas (UNAL) is running!")
                print(f"👉 Local URL: {url}")
                print(f"📁 Serving:   {os.getcwd()}")
                print("=" * 60 + "\n")
                print("Press Ctrl+C to stop the server.\n")
                
                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("\nShutting down server. Goodbye!")
                    sys.exit(0)
        except OSError as e:
            if "Address already in use" in str(e):
                continue
            raise

if __name__ == "__main__":
    run_server()
