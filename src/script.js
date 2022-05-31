import './style.css'
import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {PointLight} from 'three'

// Loading
const textureLoader = new T.TextureLoader()
const normalTexture = textureLoader.load( '/NormalMap.png' )

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new T.Scene()

// Objects - the shapes you will use in the project
const geometry = new T.SphereBufferGeometry( 0.7, 64, 64 );

// Materials - refering to what would be the skin of the body
const material = new T.MeshStandardMaterial()
material.metalness = 0.85
material.roughness = 0
material.normalMap = normalTexture


gui.add(material, 'metalness').min(0).max(1)
gui.add(material, 'roughness').min(0).max(1)


material.color = new T.Color(0xffffff)

// Mesh - the part where we combine the materials with the objects ( declare the object then the material )
const sphere = new T.Mesh(geometry,material)
scene.add(sphere)

// Lights

// const pointLight = new T.PointLight(0xffffff, 1)
// pointLight.position.set( -1, -1, 1 )
// scene.add(pointLight)

const pointLight = new T.PointLight(0x30bfff, 2)
pointLight.position.set( 1, 1, 3 )
pointLight.intensity = 1.7
scene.add(pointLight)

const firstLight = gui.addFolder( 'First Light' )

firstLight.add(pointLight.position, 'x').min(-6).max(6) 
firstLight.add(pointLight.position, 'y').min(-6).max(6) 
firstLight.add(pointLight.position, 'z').min(-6).max(6) 
firstLight.add(pointLight, 'intensity').min(0).max(10) 

const changableColor = { 
	color: 0x30bfff
}

firstLight.addColor( changableColor, 'color')
	.onChange(() => {
		pointLight.color.set(changableColor.color)
	})

const pointLightHelper = new T.PointLightHelper(pointLight, 1)
scene.add( pointLightHelper )


const pointLight2 = new T.PointLight(0x4400ff, 2)
pointLight2.position.set( -6, -6, 3 )
pointLight2.intensity = 1.7
scene.add(pointLight2)

const secondLight = gui.addFolder( 'Second Light' )

secondLight.add(pointLight2.position, 'x').min(-6).max(6) 
secondLight.add(pointLight2.position, 'y').min(-6).max(6) 
secondLight.add(pointLight2.position, 'z').min(-6).max(6) 
secondLight.add(pointLight2, 'intensity').min(0).max(10) 

const changableColor2 = { 
	color: 0xff0000
}

secondLight.addColor( changableColor2, 'color')
	.onChange(() => {
		pointLight2.color.set(changableColor2.color)
	})

const pointLightHelper2 = new T.PointLightHelper(pointLight2, 1)
scene.add( pointLightHelper2 )

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new T.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new T.WebGLRenderer({
    canvas: canvas,
	 alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new T.Clock()

const { x, y, z } = [ 1.5, 0.5, 0.5 ]


const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 1.5 * elapsedTime
    sphere.rotation.x = .5 * elapsedTime
    sphere.rotation.z = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
