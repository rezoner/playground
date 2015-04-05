<?

/* set autoload to php/{className}.php */

function __autoload($class) {
  require 'php/'.preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
}

cache::crawlDocuments("documents", array());

$route = substr($_SERVER['REQUEST_URI'], strrpos($_SERVER['SCRIPT_NAME'], "/") + 1);

$getpos = strrpos($route, '?');

if($getpos) $route = substr($route, 0, $getpos);
$route = explode('/', $route);

if(!$route[0]) $route[0] = 'index';

if(!end($route)) array_pop($route);

$path = implode('/', $route);


cms::$path = $path;

$meta = cms::readMeta("documents/$path.md");

if(!isset($meta['thumb'])) $meta['thumb'] = "playgroundjs.png";
if(!isset($meta['title'])) $meta['title'] = "Playground.js - Essential framework for javascript gamedevelopers.";
if(!isset($meta['description'])) $meta['description'] = "Essential framework for javascript gamedevelopers.";

$base = isset($meta['base']) ? $meta['base'] : "base";

echo cms::template($base, array(
  "body" => cms::compose("documents/$path.md"),
  'meta' => $meta
));