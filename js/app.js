$('document').ready(function() {
  // List of Google fonts which can be loaded
  var fonts = ['Passion One', 'Poiret One', 'Indie Flower', 'Special Elite', 'Lobster', 'Pacifico', 'Shadows Into Light', 'Righteous', 'Amatic SC', 'Dancing Script', 'Chewy', 'Patua One', 'Sigmar One', 'Bangers', 'Architects Daughter', 'Abril Fatface', 'Fredoka One', 'Covered By Your Grace', 'Comfortaa', 'Lobster Two', 'Kaushan Script', 'Gloria Hallelujah', 'Satisfy', 'Courgette', 'Coming Soon', 'Luckiest Guy', 'Permanent Marker', 'Alfa Slab One', 'Black Ops One', 'Cookie', 'Handlee', 'Tangerine', 'Rock Salt', 'Pinyon Script', 'Great Vibes', 'Marck Script', 'Damion', 'Niconne', 'Gochi Hand', 'Bad Script', 'Alex Brush', 'Homemade Apple', 'Waiting for the Sunrise', 'Kalam', 'Reenie Beanie', 'Neucha', 'Allura', 'Rochester', 'Rancho', 'Merienda', 'Petit Formal Script', 'Sue Ellen Francisco', 'Berkshire Swash', 'Loved by the King', 'La Belle Aurore'];

  // List of three fonts which will be loaded by the browser when the site is first loaded
  var loadedFonts = ['Berkshire Swash', 'Loved by the King', 'La Belle Aurore'];

  // Starting point for the counter
  var count = 2;

  // Declare variables for later use
  var oldCount, loadedFont;

  // Returns a random font from the font list
  function randFont() {
    return fonts[Math.floor(Math.random() * fonts.length)];
  }

  // Gets a random font and makes sure that it's different to the three that are in loadedFonts
  function getNewFont() {
    var newFont = randFont();
    if (loadedFonts.indexOf(newFont) !== -1) {
      return getNewFont();
    }
    return newFont;
  }

  // A counter to cycle through the three loadedFonts in reverse order
  function counter(count) {
    if (count === 0) {
      return 2;
    } else if (count === 2) {
      return 1;
    } else {
      return 0;
    }
  }

  // Creates three Google fonts links in the head of the site when it is loaded, and therefore loads the three loadedFonts for use
  for (var i in loadedFonts) {
    var wf = document.createElement('link');
    wf.href = 'https://fonts.googleapis.com/css?family=' + loadedFonts[i] + ':400&text=%22';
    wf.rel = 'stylesheet';
    wf.type = 'text/css';
    var links = document.getElementsByTagName('link');
    var s = links[0];
    s.parentNode.insertBefore(wf, s);
  }

  // When the button is clicked, changes the font-family of the quotation marks to the next font in the loadedFonts list, and replaces the font which was just being used with a new random font
  $('.quote-random').click(function() {
    oldCount = count;
    count = counter(count);
    loadedFont = loadedFonts[count];
    $('.quotation-mark').css('font-family', loadedFont);
    var wf = document.getElementsByTagName('link')[oldCount];
    var newFont = getNewFont();
    loadedFonts[oldCount] = newFont;
    wf.href = 'https://fonts.googleapis.com/css?family=' + newFont + ':400&text=%22';

    // Update the page to display the link to the corresponding Google fonts page
    $('.font-link').attr('href', 'https://www.google.com/fonts/specimen/' + newFont);
    $('.font-link').html(newFont);

    // Update the tweet button so that it includes a link to the corresponding Google fonts page. For some reason this will only work if the newFont contains no spaces
    // So instead, include the font link as part of the text attribute, which produces an imperfect link if there are spaces in it as they are converted from URI to plain text, but it's better than nothing
    var text = 'https://twitter.com/intent/tweet?text=Wow%20I%20just%20found%20some%20amazing%20quotes!!!! https%3A%2F%2Fwww.google.com%2Ffonts%2Fspecimen%2F' + encodeURIComponent(newFont);
    console.log($('#twitter-widget-0').attr('src'));
    $('#tweet').attr('href', text);
  });
});
