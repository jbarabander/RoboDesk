/**********************************************************************
 *
 *  Hello, brave warrior. It is time to begin your nw.js journey.
 *
 *  In your travels, remember that this file is both a browser AND a
 *  node.js file.
 *
 *  For example we have:
 **********************************************************************/

console.log($); // jQuery at the ready.

$(document).ready(function () {

    /**********************************************************************
     *
     *  But, in addition to DOM interaction, we also have the ability to
     *  include node libraries that interact with our machine as well.
     *
     **********************************************************************/

    console.log(typeof require('fs').readFile); // "function"

    /**********************************************************************
     *
     *  How to build a terminal in your browser then? Think about how node
     *  is able to run shell commands on a machine. nw.js can do what
     *  node can do.
     *
     *  It is dangerous to go alone. Take this:
     *
     **********************************************************************/

    var $prompt = $('#prompt'); // Our terminal <input> element.
    var $output = $('#output'); // A <pre> container for our terminal output.
    $prompt.focus();            // Auto-focus the input on load.

    // Good luck!
    // ---------------------------------------------------------------------

});