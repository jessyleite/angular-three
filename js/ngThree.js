'use strict';
app.directive('ngThree', function () {
    return {
        restrict: 'A',
        scope: {
            'model': '=',
            'scale': '=',
            'camera': '=',
            'fps': '='
        },
        link: function postLink(scope, element, attrs) {

            var camera, scene, renderer, directionalLight, loader, mesh, clock;
            var WIDTH = window.innerWidth;
            var HEIGHT = window.innerHeight;

            scope.init = function () {

                setTimeout(function () {
                    scope.sayHello()
                }, 2000);

                clock = new THREE.Clock();

                scene = new THREE.Scene();

                loader = new THREE.JSONLoader();

                renderer = new THREE.WebGLRenderer({
                    antialias: true
                });
                renderer.setClearColor(0x222244);
                renderer.setSize(WIDTH, HEIGHT);

                element[0].appendChild(renderer.domElement);
                
                camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 10000);
                camera.position.z = 100;
                scene.add(camera);

                directionalLight = new THREE.DirectionalLight(0xffffff, 1);
                directionalLight.position.set(0, 0, 1);
                scene.add(directionalLight);

            };


            scope.animate = function () {

                scope.fps = Math.round(1 / clock.getDelta());
                setTimeout(function () {
                    scope.$apply()
                }, 0);

                requestAnimationFrame(scope.animate);
                scope.render();
            };
            
            scope.render = function () {
                renderer.render(scene, camera);
            };
            
            scope.sayHello = function () {
                scope.$emit('sayHelloFromThree', null);
            };

            scope.$watch('scale', function () {
                if (mesh) mesh.scale.set(scope.scale, scope.scale, scope.scale);
            });

            scope.$watch('model', function () {
                if (mesh) {
                    scene.remove(mesh);
                }
                loader.load("models/" + scope.model + "/_.js", function (geometry, materials) {
                    mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                    scene.add(mesh);
                });
            });

            scope.$watch(function () {
                return scope.camera.y
            }, function () {
                camera.position.y = scope.camera.y;
            });

            scope.$on('sayHelloFromController', function (event, args) {
                console.log('Controller says hello via Three');
            });

            scope.init();
            scope.animate();
        }
    };
});