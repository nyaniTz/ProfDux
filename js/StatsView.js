class StatsView {

    columns

    constructor(structureObjectArray, studentsObjectArray, quizObjectArray, examObjectArray, weightObjectArray){

        this.indexingColumn = 1,
        this.userDetailsColumns = 2,
        this.structureColumns = structureObjectArray.length,
        this.totalColumn = 1

        this.structureObjectArray = structureObjectArray;

        this.columns = this.indexingColumn + this.userDetailsColumns + this.structureColumns + this.totalColumn;
        console.log("columns: ", this.columns)
    }
    
    renderOuterGridTableLayout(){
        const { centerContent, gridContainer } = renderOuterGridTableLayout();

        const gradeStatsReviewContainer = document.querySelector(".grades-stats-review-container");
        gradeStatsReviewContainer.innerHTML = "";
        gradeStatsReviewContainer.appendChild(centerContent);

        this.gridContainer = gridContainer;
    }

    render(){
        this.renderOuterGridTableLayout();
        this.tweakGridCSS();
        this.renderHeader();
        this.renderGradeRow();
    }

    tweakGridCSS(structureWidth = 100){

        let gridTableTemplateColumns = 
        `auto auto 1fr repeat(${this.structureColumns}, auto) auto`;

        let minWidth = '100px 100px 200px' + ` ${this.structureColumns * structureWidth}px ` + '100px';

        const root = document.querySelector(":root");
        root.style.setProperty("--number-cols", this.columns);
        root.style.setProperty("--min-width", minWidth);
        root.style.setProperty("--grid-table-template-columns", gridTableTemplateColumns);
        // root.style.setProperty("--grid-table-template-columns", gridTableTemplateColumns);
    }

    renderHeader(){

        const gridHeader = document.createElement("ul");
        gridHeader.className = "grid-header";

        const indexCell= document.createElement("li");
        indexCell.className = "fixed100";
        indexCell.textContent = "#";

        const userImageCell = document.createElement("li");
        userImageCell.className = "fixed100";
        userImageCell.innerHTML = "Image";

        const userNameCell = document.createElement("li");
        userNameCell.className = "freefraction";
        userNameCell.textContent = "Name"

        gridHeader.append(indexCell)
        gridHeader.append(userImageCell)
        gridHeader.append(userNameCell)

        this.structureObjectArray.forEach( structure => {
            const headerCell= document.createElement("li");
            headerCell.className = "fixed100";
            headerCell.textContent = structure;
            gridHeader.append(headerCell)
        })

        const totalMarksCell = document.createElement("li");
        totalMarksCell.className = "fixed100";
        totalMarksCell.textContent = "Total";
        gridHeader.append(totalMarksCell)

        this.gridContainer.append(gridHeader);

    }

    renderGradeRow(rowObject){

        const gridRow = document.createElement("ul");
        gridRow.className = "grid-row";

        const indexCell= document.createElement("li");
        indexCell.className = "itemization-badge fixed100";

        const userImageCell = document.createElement("li");
        userImageCell.className = "fixed100";
        userImageCell.textContent = "...";
        //TODO: async loader for images.

        const userNameCell = document.createElement("li");
        userNameCell.className = "freefraction";
        userNameCell.textContent = "..."

        gridRow.append(indexCell)
        gridRow.append(userImageCell)
        gridRow.append(userNameCell)

        this.structureObjectArray.forEach( structure => {
            const rowCell = document.createElement("li");
            rowCell.className = "fixed100";
            rowCell.textContent = "...";
            gridRow.append(rowCell)
        })

        const totalMarksCell = document.createElement("li");
        totalMarksCell.className = "fixed100";
        totalMarksCell.textContent = "40";
        gridRow.append(totalMarksCell)

        this.gridContainer.append(gridRow);

    }
    
    renderRespectiveStudentDetails(){

    }
}

function sumFrom(object){
    return Object.entries(object).reduce((a, entry) => {
        return a + entry[1]
    }, 0)
}

let statsView = new StatsView(["Quiz 1", "Quiz 2", "Quiz 3"]);
statsView.render();

function renderOuterGridTableLayout(){

    const centerContent = document.createElement("div");
    centerContent.className = "center-content";

    const extendedWrapper = document.createElement("div");
    extendedWrapper.className = "extended-wrapper";

    const gridContainer = document.createElement("div");
    gridContainer.className = "grid-table-section user-table";

    const slideToScrollElement = document.createElement("div");
    slideToScrollElement.className = "slide-to-scroll";
    slideToScrollElement.textContent = "scroll / slide → ";

    extendedWrapper.appendChild(gridContainer);
    extendedWrapper.appendChild(slideToScrollElement);
    centerContent.appendChild(extendedWrapper);

    return { centerContent, gridContainer, slideToScrollElement };
}