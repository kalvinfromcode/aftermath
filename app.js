(function() {
	const config = {
	    apiKey: "AIzaSyD0Fh_eak1Z-Lm_dDf_aXlhXWtToO-APD4",
	    authDomain: "aftermathcac.firebaseapp.com",
	    databaseURL: "https://aftermathcac.firebaseio.com",
	    storageBucket: "aftermathcac.appspot.com",
  	};
	firebase.initializeApp(config);

	//get elements
	const txtEmail = document.getElementById('inEmail');
	const txtPassword = document.getElementById('inPass');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	//add login event
	btnLogin.addEventListener('click', e => {
		console.log("reached");
		//get email and pass (extract text)
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		//sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
	});
}());

// const auth = firebase.auth();
// auth.signInWithEmailAndPassword(email, pass);
// auth.createUserWithEmailAndPassword(email, pass);
// auth.onAuthStateChanged(firebaseUser => { });

