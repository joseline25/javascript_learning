/*

    Our project in this chapter is to build an automaton, a little program
that performs a task in a virtual world. Our automaton will be a maildelivery 
robot picking up and dropping off parcels.

*/

// Meadowfield

/*
    The village of Meadowfield isn’t very big. It consists of 11 places with
14 roads between them. It can be described with this array of roads
*/

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

/*
    The network of roads in the village forms a graph. A graph is a collection of 
    points (places in the village) with lines between them (roads).
    This graph will be the world that our robot moves through.



    The array of strings isn’t very easy to work with. What we’re interested
     in is the destinations that we can reach from a given place. Let’s
    convert the list of roads to a data structure that, for each place, tells
    us what can be reached from there
*/

function buildGraph(edges) {
  // create the graph as an empty object
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);

// my way

/*
Je brise d'abord chaque element de l'array road avec split 
Je stocke dans un nouvel array
Je parcours tous les elements de array qui 

*/

function buildRoad(edges) {
  // get all the keys of my dict
  let my_keys = [];
  for (let edge of edges) {
    my_keys.push(edge.split("-"));
  }

  // concat all the elements of the arrays in my_keys into places
  const places = my_keys.flat(2);

  // remove duplicates from  places
  const keys = places.filter((place, index) => places.indexOf(place) === index);

  // constitute the map of destinations from keys
  let destinations = {};
  for (let key of keys) {
    destinations[key] = [];
    for (let k of my_keys) {
      if (key === k[0]) {
        destinations[key].push(k[1]);
      } else if (key === k[1]) {
        destinations[key].push(k[0]);
      }
    }
  }
  return destinations;
}

const mine = buildRoad(roads);
console.log(mine);

/*

    The task
Our robot will be moving around the village. There are parcels in
various places, each addressed to some other place. The robot picks
up parcels when it comes to them and delivers them when it arrives at
their destinations.
The automaton must decide, at each point, where to go next. It has
finished its task when all parcels have been delivered.


*/

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if (!mine[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

/*
    The move method is where the action happens. It first checks whether
there is a road going from the current place to the destination, and if
not, it returns the old state since this is not a valid move.
Then it creates a new state with the destination as the robot’s new
place. But it also needs to create a new set of parcels—parcels that
the robot is carrying (that are at the robot’s current place) need to be
moved along to the new place.
*/


