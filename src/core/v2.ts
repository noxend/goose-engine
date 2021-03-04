import Vector from '../utils/Vector'

class ObjectsManager {
  public objects: Obj[] = []

  public add(object: typeof Obj, components?: Array<typeof Component>, name?: string) {
    const instance = new object(name || object.name, this, components)
    this.objects.push(instance)
    return instance
  }

  public destroy(obj: Obj) {
    this.objects = this.objects.filter((object) => object.name !== obj.name)
  }

  public update() {
    for (const obj of this.objects) {
      obj.update()
    }
  }
}

class Obj {
  public position = new Vector()
  public componentsInstances: Array<Component> = []
  public parent: Obj | null = null

  constructor(
    public name: string,
    public manager: ObjectsManager,
    components: Array<typeof Component> = []
  ) {
    for (const component of components) {
      this.addComponent(component)
    }
    this.awake()
  }

  public addComponent(component: typeof Component): Component {
    const instance = new component(this)
    this.componentsInstances.push(instance)
    return instance
  }

  public getComponent(component: typeof Component) {
    return this.componentsInstances.filter((c) => c instanceof component)[0]
  }

  public destroy() {
    this.manager.destroy(this)
  }

  public update() {
    for (const component of this.componentsInstances) {
      component.update()
    }
  }

  public setParent(obj: Obj) {
    if (this !== obj) {
      this.parent = obj
    }
  }

  public awake() {
    for (const component of this.componentsInstances) {
      component.awake()
    }
  }
}

class Component {
  constructor(public object: Obj) {}

  awake() {}

  update() {}
}

class Collider extends Component {
  size = 10
}

class PhysicBody extends Component {
  mass = 1
  gravity = 10
}

class MovementController extends Component {
  collider!: Collider
  physicBody!: PhysicBody

  awake() {
    this.collider = this.object.getComponent(Collider) as Collider
    this.physicBody = this.object.getComponent(PhysicBody) as PhysicBody
  }

  update() {
    console.log(this.collider, this.physicBody)
  }
}

//

const objectsManager = new ObjectsManager()

class Hero extends Obj {}

objectsManager.add(Hero, [MovementController, PhysicBody, Collider])
objectsManager.add(Hero, [MovementController, PhysicBody, Collider], 'Hero2')
