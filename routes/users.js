const  express  =  require( 'express' );
const  router  =  express.Router();

const  users  =  [
    {  id: 1,  name: 'Alice Johnson',  email: 'alice@example.com',  role: 'admin'  },
    {  id: 2,  name: 'Bob Smith',  email: 'bob@example.com',  role: 'user'  },
    {  id: 3,  name: 'Carol White',  email: 'carol@example.com',  role: 'user'  },
];

function  validateUserFields( body ) {
    const  errors  =  [];
    if ( !body.name  ||  body.name.trim().length  ===  0 ) {
        errors.push( 'name is required and cannot be empty' );
    }
    if ( !body.email  ||  !body.email.includes( '@' ) ) {
        errors.push( 'a valid email is required' );
    }
    return  errors;
}

router.get( '/',  ( req,  res ) => {
    const  { role }  =  req.query;
    if ( role ) {
        const  filtered  =  users.filter( u  =>  u.role  ===  role );
        return  res.json( filtered );
    }
    res.json( users );
});

router.get( '/:id',  ( req,  res ) => {
    const  user  =  users.find( u  =>  u.id  ===  parseInt( req.params.id ) );
    if ( !user )  return  res.status( 404 ).json({  error: 'User not found'  });
    res.json( user );
});

router.post( '/',  ( req,  res ) => {
    const  validationErrors  =  validateUserFields( req.body );
    if ( validationErrors.length  >  0 ) {
        return  res.status( 400 ).json({  errors: validationErrors  });
    }
    const  { name,  email,  role  =  'user' }  =  req.body;
    const  newUser  =  {  id: users.length  +  1,  name,  email,  role  };
    users.push( newUser );
    res.status( 201 ).json( newUser );
});

router.patch( '/:id',  ( req,  res ) => {
    const  index  =  users.findIndex( u  =>  u.id  ===  parseInt( req.params.id ) );
    if ( index  ===  -1 )  return  res.status( 404 ).json({  error: 'User not found'  });
    const  allowedFields  =  [ 'name',  'email',  'role' ];
    const  updates  =  {};
    for ( const  key  of  Object.keys( req.body ) ) {
        if ( allowedFields.includes( key ) ) {
            updates[ key ]  =  req.body[ key ];
        }
    }
    users[ index ]  =  {  ...users[ index ],  ...updates  };
    res.json( users[ index ] );
});

router.put( '/:id',  ( req,  res ) => {
    const  index  =  users.findIndex( u  =>  u.id  ===  parseInt( req.params.id ) );
    if ( index  ===  -1 )  return  res.status( 404 ).json({  error: 'User not found'  });
    users[ index ]  =  {  ...users[ index ],  ...req.body  };
    res.json( users[ index ] );
});

router.delete( '/:id',  ( req,  res ) => {
    const  index  =  users.findIndex( u  =>  u.id  ===  parseInt( req.params.id ) );
    if ( index  ===  -1 )  return  res.status( 404 ).json({  error: 'User not found'  });
    users.splice( index,  1 );
    res.status( 204 ).send();
});

module.exports  =  router;
