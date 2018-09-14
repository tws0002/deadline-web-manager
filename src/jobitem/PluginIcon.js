import React from 'react';
import houdiniLogo from '../source/logo/houdini.png';
import threedsmaxLogo from '../source/logo/3dsmax.png';
import mayaLogo from '../source/logo/maya.png';

const logos = {
  Houdini: houdiniLogo,
  threedsmax: threedsmaxLogo,
  MayaBatch: mayaLogo
}

const PluginIcon = props => {
  const plugin = props.plugin !== '3dsmax' ? props.plugin : 'threedsmax';

  if (plugin in logos){
    return <img className={props.className} src={logos[plugin]} alt={plugin} />
  }else{
    return <span className={props.className}>{plugin}</span>
  }
  
}

export default PluginIcon;