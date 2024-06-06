
export const sortData = [
    'Название, от А до Я',
    'Название, от Я до А',
    'Высокий рейтинг',
    'Низкий рейтинг'
]

export default sortData;

export const sortByTitle = (collegeData) => {

    const sortData = [...collegeData].sort((a, b) => {
        if (a.collegeHeader.title > b.collegeHeader.title) {
          return -1;
        } else if (a.collegeHeader.title < b.collegeHeader.title) {
          return 1;
        } else {
          return 0;
        }
    });
    return sortData;
}

export const sortByTitleReverse = (collegeData) => {

    const sortData = [...collegeData].sort((a, b) => {
        if (a.collegeHeader.title > b.collegeHeader.title) {
          return 1;
        } else if (a.collegeHeader.title < b.collegeHeader.title) {
          return -1;
        } else {
          return 0;
        }
    });
    return sortData;
}

export const sortByGrade = (collegeData) => {

    const sortData = [...collegeData].sort((a, b) => {
      if (a.collegeDescription.grade > b.collegeDescription.grade) {
        return -1;
      } else if (a.collegeDescription.grade < b.collegeDescription.grade) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortData;
}

export const sortByGradeReverse = (collegeData) => {

    const sortData = [...collegeData].sort((a, b) => {
        if (a.collegeDescription.grade > b.collegeDescription.grade) {
          return 1;
        } else if (a.collegeDescription.grade < b.collegeDescription.grade) {
          return -1;
        } else {
          return 0;
        }
    });
    return sortData;
}