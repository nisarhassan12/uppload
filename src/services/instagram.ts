import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { translate } from "../helpers/i18n";

export default class Instagram extends UpploadService {
  name = "instagram";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M180.8.8a94 94 0 0131 6 62.7 62.7 0 0122.7 14.7 62.7 62.7 0 0114.7 22.7 94 94 0 016 31c.6 13.1.7 17.7.8 48.8v8c0 31.1-.2 35.7-.8 48.8a94 94 0 01-6 31 65.4 65.4 0 01-37.4 37.4 94 94 0 01-31 6c-13.1.6-17.7.7-48.8.8h-8c-31.1 0-35.7-.2-48.8-.8a94 94 0 01-31-6 62.7 62.7 0 01-22.7-14.7 62.7 62.7 0 01-14.7-22.7 94 94 0 01-6-31c-.6-12.9-.7-17.5-.8-47V123c0-30.2.2-34.8.8-47.8a94 94 0 016-31 62.7 62.7 0 0114.7-22.7A62.7 62.7 0 0144.2 6.8a94 94 0 0131-6 811 811 0 0147-.8H133c30.2 0 34.8.2 47.8.8zM132 26h-8.7c-23.4 0-27.1.1-37.4.6a74.9 74.9 0 00-24.7 4.8 50 50 0 00-18 11.7 50 50 0 00-11.8 18A74.9 74.9 0 0026.6 86c-.4 10.2-.6 13.9-.6 36.6v11c0 22.7.2 26.4.6 36.6a74.9 74.9 0 004.8 24.7 50 50 0 0011.7 18 50 50 0 0018 11.8 74.9 74.9 0 0024.8 4.8c10.5.5 14.1.6 38.9.6h6.4c24.8 0 28.4-.1 38.9-.6a74.9 74.9 0 0024.7-4.8 52.2 52.2 0 0029.8-29.8 74.9 74.9 0 004.8-24.7c.5-10.5.6-14.1.6-39v-6.3c0-24.8-.1-28.4-.6-38.9a74.9 74.9 0 00-4.8-24.7 50 50 0 00-11.7-18 50 50 0 00-18-11.8 74.9 74.9 0 00-24.8-4.8c-10.4-.5-14-.6-38.1-.6zm0 18.4c23.6 0 27 .1 37.2.6 10 .4 15.4 2 19 3.5 4.4 1.6 8.4 4.2 11.7 7.6 3.4 3.3 6 7.3 7.6 11.7 1.4 3.6 3 9 3.5 19 .5 10.2.6 13.6.6 37.3v7.8c0 23.7-.1 27-.6 37.3-.4 10-2 15.4-3.5 19a33.8 33.8 0 01-19.3 19.3c-3.6 1.4-9 3-19 3.5-10.3.5-13.7.6-38 .6h-7a643 643 0 01-37.4-.6c-10-.4-15.4-2-19-3.5a31.6 31.6 0 01-11.7-7.6c-3.4-3.3-6-7.3-7.6-11.7-1.4-3.6-3-9-3.5-19-.5-10.3-.6-13.7-.6-38v-7c0-23.8.1-27.2.6-37.4.4-10 2-15.4 3.5-19 1.6-4.4 4.2-8.4 7.6-11.7 3.3-3.4 7.3-6 11.7-7.6 3.6-1.4 9-3 19-3.5 10.2-.5 13.6-.6 37.3-.6zM128.4 75a52.5 52.5 0 100 105 52.5 52.5 0 000-105zm0 18.4a34 34 0 110 68.2 34 34 0 010-68.2zM182 62a12 12 0 100 24 12 12 0 000-24z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#cc3366";

  template = () => {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="Enter a URL">
        <button type="submit" style="background: ${
          this.color
        }"><i class="fas fa-file-import"></i>${translate(
      "services.instagram.button"
    )}</button>s
      </form>
      <footer>
        <p>
          <a href="https://uppload.netlify.com/help/instagram">Where do I find the URL?</a>
        </p>
      </footer>
    `;
  };

  handlers = ({ next, handle }: HandlersParams) => {
    const form = document.querySelector(
      `.${this.class("form")}`
    ) as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", event => {
        const input = document.querySelector(
          `.${this.class("input")}`
        ) as HTMLInputElement | null;
        if (input) {
          const url = input.value;
          window
            .fetch(`https://images.weserv.nl/?url=${url}`)
            .then(response => {
              if (!response.ok) throw new Error("response_not_ok");
              return response.blob();
            })
            .then(blob => next(blob))
            .catch(error => handle(error));
        }
        event.preventDefault();
        return false;
      });
    }
  };

  fetch(url: string) {
    return new Promise((resolve, reject) => {
      window
        .fetch("")
        .then(response => response.blob())
        .then(blob => resolve(blob))
        .catch(error => reject(error));
    });
  }
}
