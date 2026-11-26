export class Modal {
  private dialog: HTMLDialogElement;
  private title: HTMLElement;
  private text: HTMLElement;

  constructor(id: string) {
    const dialog = document.querySelector<HTMLDialogElement>(`#${id}`);
    const title = dialog?.querySelector<HTMLElement>("#modal-title");
    const text = dialog?.querySelector<HTMLElement>("#modal-text");

    if (!dialog || !title || !text) {
      throw new Error(`Модальное окно #${id} собрано неверно`);
    }

    this.dialog = dialog;
    this.title = title;
    this.text = text;

    this.dialog.addEventListener("click", (event) => {
      if (event.target === this.dialog) this.dialog.close();
    });
  }

  open(title: string, text: string): void {
    this.title.textContent = title;
    this.text.textContent = text;
    this.dialog.showModal();
  }

  close(): void {
    this.dialog.close();
  }
}
