import io from "socket.io-client"

class SocketAPI {
  readonly socket

  constructor(host: string, path?: string) {
    this.socket = io(host, { path })
  }

  on(event: string, callback: (arg: any) => void) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error("Socket error."))
      return this.socket.on(event, callback)
    })
  }

  emit(event: string, data: any): void {
    this.socket.emit(event, data)
  }
}

export default SocketAPI
