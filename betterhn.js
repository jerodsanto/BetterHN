if (window.top === window) {

  // single item page
  if (window.location.pathname === "/item") {
    var $wrapper    = $('center table:first'),
        $header     = $wrapper.find('tr:eq(0) td'),
        $submission = $wrapper.find('tr:eq(3) table:eq(0)').find('tr:eq(3) td:last'),
        $comments   = $wrapper.find('tr:eq(3) table:eq(1)'),
        $roots      = $comments.find('td img[width=0]').closest('tr').parent().closest('tr');

    // submission text links
    var submissionText = $submission.html();
    $submission.html(submissionText.replace(/(https?:\/\/.*?)[\s|<]/g, function() {
      var terminator = arguments[0].charAt(arguments[0].length - 1),
          url        = arguments[1];

      // I can't get the regex above to match a "." at the end of a url, but not inside the url
      // so here is a cheap hack to work around my incompetency
      if (url.match(/\.$/)) {
        url        = url.replace(/\.$/, "");
        terminator = '.' + terminator;
      }
      return '<a href="' +url + '" target="_blank">' + url + '</a>' + terminator;
    }));

    // thread folding
    $roots.each(function(index) {
      $(this).addClass('root').find('.comhead').append(' | <a href="#" class="fold">fold</a>');
    });

    var foldedColor   = $header.css('background-color'),
        unfoldedColor = '#828282';
    $('a.fold').toggle(function() {
      var $anchor = $(this);
      $anchor.closest('tr.root').nextUntil('.root').slideUp();
      $anchor.html('unfold').css('color', foldedColor);
    }, function() {
      var $anchor = $(this);
      $anchor.closest('tr.root').nextUntil('.root').slideDown();
      $anchor.html('fold').css('color', unfoldedColor);
    });
  }

}
