# Build for prod
ng build --aot --prod

gulp before:ngc

ngc

gulp after:ngc

webpack

# Generate manfest file
#ngu-sw-manifest --dist dist --in ngsw-manifest.json --out dist/ngsw-manifest.json

# Service worker
#cp node_modules/@angular/service-worker/bundles/worker-basic.min.js /dist
