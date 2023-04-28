import { Physics, Debug } from '@react-three/rapier'
import useGame from '../stores/useGame.jsx'
import Lights from './Lights.jsx'
import { World } from './World.jsx'
import Player from './Player.jsx'
import Effects from './Effects.jsx'

export default function Experience()
{
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)

    return <>   
        <color args={ [ '#252731' ] } attach="background" />

        <Physics gravity={[0, -20, 0]}>
            {/* <Debug /> */}
            <Lights />
            <World count={ blocksCount } seed={ blocksSeed } />
            <Player />
        </Physics>

        {/* <Effects /> */}
    </>
}