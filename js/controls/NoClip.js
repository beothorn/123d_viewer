/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );

	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
    var moveUp = false;
    var moveDown = false;

	var prevTime = performance.now();

	var velocity = new THREE.Vector3();

	var PI_2 = Math.PI / 2;

    document.addEventListener( 'mousemove', function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

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

	this.getObject = function () {
		return yawObject;
	};

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

        var direction = new THREE.Vector3( velocity.x, velocity.y, velocity.z);
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
        rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
		direction.applyEuler( rotation );
        
        var translation = new THREE.Vector3( direction.x, direction.y, direction.z);
        translation.multiplyScalar(delta);
        
		yawObject.translateX( translation.x );
		yawObject.translateY( translation.y ); 
		yawObject.translateZ( translation.z );

		prevTime = time;

	};

};
