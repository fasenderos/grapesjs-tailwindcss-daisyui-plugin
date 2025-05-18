export const html = `<!-- You can open the modal using ID.showModal() method -->
<button class="btn" onclick="daisyui_modal.showModal()">open modal</button>
<dialog id="daisyui_modal" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>`;
