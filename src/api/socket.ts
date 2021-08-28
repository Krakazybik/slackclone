import io from "socket.io-client"

class SocketAPI {
  readonly socket

  constructor(host: string, path?: string) {
    this.socket = io(host, { path })
  }

  on(event: string, callback: (arg: any) => void): void {
    this.socket.on(event, callback)
  }

  emit(event: string, data: any): void {
    this.socket.emit(event, data)
  }

  close(): void {
    this.socket.disconnect()
  }
}

export default SocketAPI
