<?php

namespace AlbertoFreelance\InViewAnimations;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class InViewAnimationsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Publicar config
        $this->publishes([
            __DIR__.'/../config/inview-animations.php' => config_path('inview-animations.php'),
        ], 'inview-animations-config');

        // Publicar assets
        $this->publishes([
            __DIR__.'/../resources/css/custom.css' => public_path(config('inview-animations.asset_path').'/inview-animations.css'),
            __DIR__.'/../resources/js/custom.js'   => public_path(config('inview-animations.asset_path').'/inview-animations.js'),
        ], 'inview-animations-assets');

        // Vistas
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'inview-animations');

        // Componente Blade
        Blade::component('inview-animations::components.assets', 'inview-animations-assets');
    }

    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/inview-animations.php', 'inview-animations');
    }
}
