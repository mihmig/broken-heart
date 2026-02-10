/*!
 * jQuery UI Touch Punch
 * Enables touch support for jQuery UI mouse interactions (e.g. draggable)
 * Minimal version adapted for this project.
 */
(function ($) {
    if (!$.ui || !$.ui.mouse) {
        return;
    }

    var mouseProto = $.ui.mouse.prototype,
        _mouseInit = mouseProto._mouseInit,
        touchHandled;

    function simulateMouseEvent(event, simulatedType) {
        if (event.originalEvent && event.originalEvent.touches && event.originalEvent.touches.length > 1) {
            return;
        }

        var touch = (event.originalEvent && (event.originalEvent.changedTouches || event.originalEvent.touches)) ?
            (event.originalEvent.changedTouches[0] || event.originalEvent.touches[0]) :
            event;

        var simulatedEvent = new MouseEvent(simulatedType, {
            bubbles: true,
            cancelable: true,
            view: window,
            detail: 1,
            screenX: touch.screenX,
            screenY: touch.screenY,
            clientX: touch.clientX,
            clientY: touch.clientY,
            ctrlKey: event.ctrlKey || false,
            altKey: event.altKey || false,
            shiftKey: event.shiftKey || false,
            metaKey: event.metaKey || false,
            button: 0,
            relatedTarget: null
        });

        event.target.dispatchEvent(simulatedEvent);
    }

    function getFirstTouch(e) {
        var oe = e.originalEvent;
        return oe.touches && oe.touches[0] ||
               oe.changedTouches && oe.changedTouches[0];
    }

    mouseProto._touchStart = function (event) {
        if (touchHandled || !getFirstTouch(event)) {
            return;
        }

        touchHandled = true;

        simulateMouseEvent(event, "mouseover");
        simulateMouseEvent(event, "mousemove");
        simulateMouseEvent(event, "mousedown");
    };

    mouseProto._touchMove = function (event) {
        if (!touchHandled) {
            return;
        }
        simulateMouseEvent(event, "mousemove");
    };

    mouseProto._touchEnd = function (event) {
        if (!touchHandled) {
            return;
        }
        simulateMouseEvent(event, "mouseup");
        simulateMouseEvent(event, "mouseout");
        touchHandled = false;
    };

    mouseProto._mouseInit = function () {
        var self = this;

        // jQuery 1.5.1 не поддерживает .on(), используем .bind()
        self.element
            .bind("touchstart." + self.widgetName, $.proxy(self, "_touchStart"))
            .bind("touchmove." + self.widgetName, $.proxy(self, "_touchMove"))
            .bind("touchend." + self.widgetName, $.proxy(self, "_touchEnd"))
            .bind("touchcancel." + self.widgetName, $.proxy(self, "_touchEnd"));

        _mouseInit.call(self);
    };

})(jQuery);


