// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((reg) => {
        console.log("Registration successfull with scope : ", reg.scope);
      })
      .catch((err) => console.error("Registration failed with error : ", err));
  });
} else {
  console.alert(
    "Browser ini tidak memiliki support untuk ServiceWorker. Silahkan upgrade browser Anda."
  );
}
