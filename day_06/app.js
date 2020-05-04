const app = document.querySelector('#app');

const createGrid = (width, height) => {
  const grid  = [];

  for (let x = 0; x < width; ++x) {
    const column = [];

    for (let y = 0; y < height; ++y) {
      column.push({
        cellid: `${x}-${y}`,
        clicked: false,
      });
    }

    grid.push(column);
  }

  return grid;
}

const state = {
  grid: createGrid(10, 10),
}

app.addEventListener('click', e => {
  if (e.target && e.target.dataset && e.target.dataset.cellid) {
    const [x, y] = e.target.dataset.cellid.split('-');

    const cell = state.grid[x][y];

    cell.clicked = !cell.clicked;

    render();
  }
});

const createRowChild = cellId => {
  const row = document.createElement('div');
  row.classList.add('row', 'grid_box');
  row.dataset.cellid = cellId;

  return row;
};

const createColumnChild = () => {
  const row = document.createElement('div');
  row.classList.add('column', 'grid_box');

  return row;
};

const render = () => {
  app.innerHTML = '';

  state.grid.forEach(rows => {
    const col = createColumnChild();

    rows.forEach(({ cellid, clicked }) => {
      const colRow = createRowChild(cellid);

      if (clicked) {
        colRow.classList.add('clicked');
      }

      col.appendChild(colRow);
    });

    app.appendChild(col);
  });
}

render();
