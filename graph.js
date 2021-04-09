// UTILS
class Utilities {
	static randomNumber () {
		return Math.ceil(Math.random() * 100);
	}
}











// GRAPH
class Vertex {
	constructor(id = null, val = null) {
		this.id = id;
		this.value = val;
		this.adjacentVertices = [];
	}
}

class Graph {
	constructor() {
		this.vertices = [];
	}

	addRandomVertex() {
		const randomId = `id${Utilities.randomNumber()}`;
		const randomValue = `randomValue${Utilities.randomNumber()}`;
		this.vertices.push(new Vertex(randomId, randomValue));
	}

	addVertex(id, val) {
		if(!id) throw new Error('No id provided as a first argument');
		let value;
		if(!val) value = `randomValue${Utilities.randomNumber()}`;
		this.vertices.push(new Vertex(id, value));
	}

	connectVertices(vertexId1, vertexId2) {
		const vertex1 = this.vertices.find(vertex => vertex.id === vertexId1);
		const vertex2 = this.vertices.find(vertex => vertex.id === vertexId2);
		if(!vertex1 || !vertex2) throw new Error('No valid id provided');

		vertex1.adjacentVertices.push(vertex2.id);
		vertex2.adjacentVertices.push(vertex1.id);
	}
	traverseGraphDF(startVertexId) {
		let visited = [];
		const traverse = (startingVertexId) => {
			const startVertex = this.vertices.find(vertex => vertex.id === startingVertexId);
			const notVisitedAdjVertices = startVertex.adjacentVertices.filter(id => !(visited.includes(id)));
			if(notVisitedAdjVertices.length < 1) return;
			// adding currently visiting adj vertices to visited list
			visited.push(...notVisitedAdjVertices);
			// print current adjecent vertices
			notVisitedAdjVertices.forEach(vertexId => console.log(vertexId));
			// recursion
			notVisitedAdjVertices.forEach(vertexId => {
				traverse(vertexId);
			})
		}
		traverse(startVertexId);
	}
	traverseGraphBF(startVertexId) {
		let visited = [];
		let queue = [startVertexId];
		const traverse = () => {
			if(queue.length < 1) return;
			// 
			const currentId = queue[0];
			const currentVertex = this.vertices.find(vertex => vertex.id === currentId);
			currentVertex.adjacentVertices.forEach(id => {
				if(!(visited.includes(id)) && !(queue.includes(id))) queue.push(id);	
			});
			visited.push(queue.shift());
			// print
			console.log(currentVertex);
			// recursion
			traverse();
		}
		traverse();
	}
	getShortestPath(startVertexId, endVertexId) {
		let visited = [];
		let queue = [startVertexId];
		let shortestPaths = [];
		// check if the id's provided exist
		const sIndex = this.vertices.findIndex(vertex => vertex.id === startVertexId);
		const eIndex = this.vertices.findIndex(vertex => vertex.id === endVertexId);
		if((sIndex === -1) || (eIndex === -1)) throw new Error("No valid id's provided as arguments");

		// breadth-first traverses the graph until encountering the endVertexId  
		const traverse = () => {
			if(queue.length < 1) return;
			// finding the current vertex from its id
			const currentId = queue[0];
			const currentVertex = this.vertices.find(vertex => vertex.id === currentId);
			if(currentVertex.id === endVertexId) return;

			// adding all adjacent vertices to the queue and their shortest paths to the array
			currentVertex.adjacentVertices.forEach(id => {
				// only if the adjacent vertex isn't already printed or enqueued
				if(!(visited.includes(id)) && !(queue.includes(id))) {
					// adding to queue
					queue.push(id);
					// adding the path to current adjacent vertex to the paths array
					let index = shortestPaths.findIndex(path => {
						if(path[path.length - 1] === currentVertex.id) return true;
					});
					if(index !== -1) {
						const updatedPath = Array.from(shortestPaths[index]);
						updatedPath.push(id);
						shortestPaths.push(updatedPath);
					} else {
						shortestPaths.push([currentVertex.id, id]);
					}
				}
			});
			// removing the current vertex from the queue and adding it to the already visited list
			visited.push(queue.shift());
			// recursion
			traverse();
		}
		traverse();
		// console.log(shortestPaths)
		const foundPath = shortestPaths.find(path => path[path.length-1] === endVertexId);
		return foundPath;
	}
}











// Filling in the graph
const graph = new Graph();
// adding some vertices
graph.addVertex('id1');
graph.addVertex('id2');
graph.addVertex('id3');
graph.addVertex('id4');
graph.addVertex('id5');
graph.addVertex('id6');
graph.addVertex('id7');
graph.addVertex('id8');
graph.addVertex('id9');
graph.addVertex('id10');
// connecting them with edges
graph.connectVertices('id1', 'id2');
graph.connectVertices('id1', 'id3');
graph.connectVertices('id1', 'id6');
graph.connectVertices('id2', 'id3');
graph.connectVertices('id2', 'id5');
graph.connectVertices('id5', 'id4');
graph.connectVertices('id5', 'id6');
graph.connectVertices('id4', 'id6');
graph.connectVertices('id4', 'id7');
graph.connectVertices('id8', 'id6');
graph.connectVertices('id8', 'id7');
graph.connectVertices('id9', 'id7');
graph.connectVertices('id9', 'id8');
graph.connectVertices('id10', 'id2');
graph.connectVertices('id10', 'id9');


// guidance
console.log(graph);

console.log("For example, to get distance from id1 to id7, call graph.getShortestPath('id1', 'id7')");
