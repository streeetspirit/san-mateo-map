export default function registerServiceWorker()
{
  if ('serviceWorker' in navigator) {

      navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker2.js`)
      .then (function(registration){
        console.log("SW registration successful with scope: ", registration.scope);
      }, function (error){
        console.log("SW registration failed: ", error);
      });
    };
  
}