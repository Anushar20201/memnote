const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile.

    event.preventDefault();
    // Stash the event so it can be triggered later.

    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container.
    butInstall.classList.toggle("hidden", false);

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const event = window.deferredPrompt;
    //if there is no event, return nothing
    if (!event) {
        return;
    }
    // Show the install prompt.
    event.prompt();
    // Resetting the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    butInstall.classList.toggle("hidden", true);


});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Resetting the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
});
