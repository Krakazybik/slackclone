import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { configureStore } from "@reduxjs/toolkit"
import Channels from "../components/Channels/Channels"
import { API_PATH } from "../api/slack"
import reducers from "../store/reducers"
import { store } from "../store/store"

const server = setupServer(
  rest.get(`*${API_PATH}`, (req, res, ctx) => {
    return res(ctx.status(401))
  })
)

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Channels test", () => {
  test("On Click Add Channel should shown focused channel name input ", async () => {
    render(
      <Provider store={store}>
        <Channels />
      </Provider>
    )

    const createChannel = screen.getByText(/Создать новый канал/i)
    fireEvent.click(createChannel)

    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveFocus()
  })

  test("On Press Enter button in input should send data to socket", async () => {
    render(
      <Provider store={configureStore({ reducer: reducers })}>
        <Channels />
      </Provider>
    )

    const createChannel = screen.getByText(/Создать новый канал/i)
    fireEvent.click(createChannel)
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "newChannel" } })
    fireEvent.keyDown(input, { key: "Enter" })
  })
})
