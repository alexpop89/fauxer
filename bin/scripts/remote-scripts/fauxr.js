(function(windowObject, documentObject, elementType, uniqueHash) {
   var LOAD_STATE = 0;
   var originalOnErrorFunction = windowObject.onerror;

   windowObject._fauxrErrors = {id: uniqueHash, errors: []};

   documentObject.addEventListener('DOMContentLoaded', function () {
      LOAD_STATE = 1;
   });

   windowObject.onload = function () {
      LOAD_STATE = 2;
   };

   windowObject.onerror = function(message, source, lineNo, colNo, error) {
      if (source) {
         windowObject._fauxrErrors.errors.push({
            message: message,
            source: source,
            lineNo: lineNo,
            colNo: colNo,
            error: error,
            loadState: LOAD_STATE,
            timestamp: new Date().getTime()
         });
      }
      originalOnErrorFunction && originalOnErrorFunction.apply(this, arguments);
   };

   var initializeFunction = function() {
      var scriptElement = documentObject.createElement(elementType);
      var createdElement = documentObject.getElementsByTagName(elementType)[0];

      scriptElement.src = "http://localhost:5000/fauxr-controller.min.js";
      scriptElement.async = !0;

      createdElement.parentNode.insertBefore(scriptElement, createdElement)
   };
   windowObject.addEventListener ? windowObject.addEventListener("load", initializeFunction, !1) : windowObject.attachEvent("onload", initializeFunction)
}(window, document, "script", "m7pocnr.attymn29"));
