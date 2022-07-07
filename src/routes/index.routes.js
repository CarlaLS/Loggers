const {Router} = require('express') 
const compression = require('compression')
const router = Router();

const {renderIndex, renderAbout, renderInfo, info} = require('../Controllers/index.controller')

router.get ('/', renderIndex);


router.get ('/about',  renderAbout);

// router.get ('/info',  renderInfo);

router.get ('/info', compression(),  renderInfo);

module.exports = router;