import "./style/style.css";
import { Logic } from "./logic.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* HTML */ `
  <form action="" method="get" class="form">
    <label class="label" for="city">Город</label>
    <input class="input" type="text" id="city" placeholder="City" name="city" required />
    <button class="submit" type="submit">Найти</button>
  </form>

  <dialog id="weather-modal">
    <div class="modal-body">
      <h2 id="modal-title"></h2>
      <p id="modal-text"></p>
      <form method="dialog">
        <button>Закрыть</button>
      </form>
    </div>
  </dialog>
`;

new Logic();
