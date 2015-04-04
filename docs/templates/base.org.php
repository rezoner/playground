<!doctype html>
<html>
  <head>
      <title>Canvas Query</title>
      
      <meta charset="utf-8"> 
        
      <meta property="og:title" content="Canvas Query"> 
      <meta property="og:image" content="http://canvasquery.com/canvasquery.png"> 
      <meta property="og:description" content="Canvas for gamedevelopers. Out of box - mouse, keyboard, scaling, loading images.">
      <meta name="description" content="Canvas for gamedevelopers. Out of box - mouse, keyboard, scaling, loading images.">

      <style>
        @import url(<?=cms::url('main.css')?>);
        @import url(<?=cms::url('mono-blue.min.css')?>);
        @import url(<?=cms::url('script/codemirror/codemirror.css')?>);
        @import url(<?=cms::url('script/codemirror/neo.css')?>);
        @import url(<?=cms::url('script/rainbow/themes/github.css')?>);
      </style>
      
      <script src="<?=cms::url('script/codemirror/codemirror.js')?>"></script>
      <script src="<?=cms::url('script/codemirror/javascript/javascript.js')?>"></script>

  </head>

  <body>
    
    <script src="<?=cms::url('script/basic.js')?>"></script>
    <script src="<?=cms::url('script/canvasquery.js')?>"></script>
    <script src="<?=cms::url('script/playground.1.40.js')?>"></script>
    <script src="<?=cms::url('script/inline-editor.js')?>"></script>

    <script>
    loadImages.path = "<?=cms::url('images/'); ?>";
    </script>

   <div id="top">

      <iframe src="http://ghbtns.com/github-btn.html?user=rezoner&repo=canvasquery&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>
      <p>author: <a href="http://twitter.com/rezoner">rezoner</a></p>

    </div>

    <div id="sidebar">    
      <?=cms::compose("documents/toc.md")?>
    </div>
 
    <div id="content">    

      <div id="wip">This page is work-in-progress. You can reach me on <a href="http://twitter.com/rezoner">twitter</a> or mail to rezoner1337@gmail.com</div>
      <?=$body?>

      <div id="disqus_thread"></div>
      <script type="text/javascript">
          /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
          var disqus_shortname = 'canvasquery'; // required: replace example with your forum shortname

          /* * * DON'T EDIT BELOW THIS LINE * * */
          (function() {
              var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
              dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
          })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
      <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
    

    </div>

 
    
    <script src="<?=cms::url('script/rainbow/rainbow.min.js')?>"></script>
    <script src="<?=cms::url('script/rainbow/language/generic.js')?>"></script>
    <script src="<?=cms::url('script/rainbow/language/javascript.js')?>"></script>
    <script src="<?=cms::url('script/bottom.js')?>"></script>

    

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-9065813-10', 'auto');
      ga('send', 'pageview');
    </script>


  </body>
</html>