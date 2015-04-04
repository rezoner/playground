<h2 class="example-title"><?=$title?></h2>

<?=cms::runExample($body)?>

<? if(isset($basicjs)): ?>
  <p class="basicjs">This example uses <a href="">basic.js</a> for basic things like loading images</p>  
<? endif ?>

