/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
    var moveUp = false;
    var moveDown = false;

	var prevTime = performance.now();

	var velocity = new THREE.Vector3();
    var xAxix = new THREE.Vector3(1,0,0);
    var yAxix = new THREE.Vector3(0,1,0);

	var PI_2 = Math.PI / 2;

    document.addEventListener( 'mousemove', function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        camera.rotateOnAxis(yAxix, movementX*-0.001);
        camera.rotateOnAxis(xAxix, movementY*-0.001);

	}, false );
    
    document.addEventListener( 'keydown', function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;

			case 32: // space
				moveUp = true;
				break;
                
            case 16: // shift
				moveDown = true;
				break;

		}

	}, false );
    

    document.addEventListener( 'keyup', function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;
                
            case 32: // space
				moveUp = false;
				break;
                
            case 16: // shift
				moveDown = false;
				break;

		}

	}, false );
	

	this.enabled = false;

	this.update = function () {

		if ( scope.enabled === false ) return;

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;

		if ( moveForward ) velocity.z -= 400.0 * delta;
		if ( moveBackward ) velocity.z += 400.0 * delta;
        if ( moveUp ) velocity.y += 400.0 * delta;
        if ( moveDown ) velocity.y -= 400.0 * delta;

		if ( moveLeft ) velocity.x -= 400.0 * delta;
		if ( moveRight ) velocity.x += 400.0 * delta;
        
		camera.translateX( velocity.x * delta );
		camera.translateY( velocity.y * delta ); 
		camera.translateZ( velocity.z * delta );

		prevTime = time;
	};

};
