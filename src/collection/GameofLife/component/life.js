export default class Life {
    constructor(props) {
        this.canvas = props.canvas
        this.context = this.canvas.getContext('2d')
        this.maxWidth = props.canvas.width
        this.maxHeight = props.canvas.height
        this.rafID = -1
        this.run = false
        this.token = false

        let offCanvas = document.createElement('canvas')
        offCanvas.width = props.canvas.width
        offCanvas.height = props.canvas.height
        this.scene = {
            canvas: offCanvas,
            context: offCanvas.getContext('2d'),
            margin: 1,
            cellSize: 8,
            column: 1,
            row: 1,
            list: [],
            aliveColor: '#000000',
            deadColor: '#FFFFFF',
            queue: []
        }
        this.camera = {
            x: 0,
            y: 0, 
            width: props.canvas.width,
            height: props.canvas.height,
        }
    }

    init() {
        this.sceneReset()
        this.update()
        requestAnimationFrame(this.loop)
    }
    sceneReset = () => {
        let scene = this.scene
        scene.column = parseInt((scene.canvas.width - scene.margin) / scene.cellSize)
        scene.row = parseInt((scene.canvas.height - scene.margin) / scene.cellSize) 
        let list = Array.from({length:scene.row},x=>Array.from({length:scene.column}, y=>0))
        scene.list.map((row, i) => {
            row.map((item, j) => {
                if (i < scene.row && j < scene.column && item) list[i][j] = 1
            })
        })
        scene.list = list

        scene.context.fillStyle = "#666666"
        scene.context.fillRect(0, 0, scene.canvas.width, scene.canvas.height)
        scene.context.fillStyle = "#FFFFFF"
        for (let i = 0; i < scene.row; i++) {
            for (let j = 0; j < scene.column; j++) {
                scene.context.fillRect(j*(scene.cellSize+scene.margin)+scene.margin, i*(scene.cellSize+scene.margin)+scene.margin, scene.cellSize, scene.cellSize)
            }
        }
    }
    sceneUpdate = () => {
        let that = this
        let scene = this.scene

        this.scene.list = this.scene.list.map((row, i) => (
            row.map((item, j) => {
                let newStatus = this.nextGeneration(i, j, item)
                if (newStatus != item) {
                    this.scene.queue.push({row: i, column: j, status: newStatus})
                }
                return newStatus
            })
        ))
        this.scene.queue.forEach(item => {
            this.scene.context.fillStyle = this.scene.list[item.row][item.column] ? this.scene.aliveColor : this.scene.deadColor
            let {x, y} = this.index2Coordinate(item.row, item.column)
            this.scene.context.fillRect(x, y, this.scene.cellSize, this.scene.cellSize)
        })
        this.scene.queue = []
    }
    nextGeneration = (row ,column , status) => {
        const count = (
            this.checkCell(row - 1, column - 1) + 
            this.checkCell(row - 1, column) + 
            this.checkCell(row - 1, column + 1) + 
            this.checkCell(row, column - 1) + 
            this.checkCell(row, column + 1) +
            this.checkCell(row + 1, column - 1) +
            this.checkCell(row + 1, column) +
            this.checkCell(row + 1, column + 1)
        )
        return (count == 3 || count == 2 && status) ? 1 : 0
    }
    checkCell = (row, column) => {
        let list = this.scene.list
        return list[row] && list[row][column] ? 1 : 0
    }
    resize = (width, height) => {
        this.maxWidth = width
        this.maxHeight = height
        this.camera.width = width
        this.camera.height = height
        this.scene.canvas.width = width
        this.scene.canvas.height = height
        this.sceneReset()
    }
    coordinate2Index = (x, y) => {
        let scene = this.scene, index = {i: 0, j: 0}
        index.i = parseInt((y - scene.margin) / (scene.cellSize + scene.margin))
        index.j = parseInt((x - scene.margin) / (scene.cellSize + scene.margin))
        return index
    }
    index2Coordinate(row, column) {
        let scene = this.scene, x, y
        x = column * (scene.cellSize + scene.margin) + scene.margin
        y = row * (scene.cellSize + scene.margin) + scene.margin

        return {
            x: x,
            y: y
        }
    }
    changeCellState = (oX, oY) => {
        let index = this.coordinate2Index(oX, oY)
        let scene = this.scene
        this.scene.list[index.i][index.j] = this.scene.list[index.i][index.j] ? 0 : 1
        scene.context.fillStyle = scene.list[index.i][index.j] ? scene.aliveColor : scene.deadColor
        let {x, y} = this.index2Coordinate(index.i, index.j)
        scene.context.fillRect(x, y, scene.cellSize, scene.cellSize)
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.drawImage(scene.canvas, this.camera.x, this.camera.y, this.camera.width, this.camera.height, 0, 0, this.canvas.width, this.canvas.height)
    }
    loop = () => {
        console.log(this.run, this.rafID)
        if (this.run) {
            this.update()
            this.rafID = requestAnimationFrame(this.loop)
        } else {
            if (this.rafID) {
                cancelAnimationFrame(this.rafID)
            }
        }
    }
    update = () => {
        this.sceneUpdate()
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.drawImage(this.scene.canvas, this.camera.x, this.camera.y, this.camera.width, this.camera.height, 0, 0, this.canvas.width, this.canvas.height)
    }
}