const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface DescriptionPart extends CoursePartBase {
    description: string
  }
  interface CoursePartBasic extends DescriptionPart {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends DescriptionPart {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends DescriptionPart {
    requirements: string[];
    kind: "special"
  }
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  interface HeaderProps {
    name: string;
  }
  interface TotalProps {
    totalExercises: number;
  }
  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };
  const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <div>
       {parts.map( part => {return (
          <div key={part.name}>
            <Part part={part}/>
          </div>
        )}
      )}
      </div>
    )
  }
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const Part = ({ part }: { part: CoursePart}) => {
      switch(part.kind){
        case "basic":
          return(
            <div>
              <p>
                {part.name} {part.exerciseCount}
                <br/>
                <em>{part.description}</em>
              </p>
            </div>
          )
        case "group":
          return (
            <div>
              <p>
                {part.name} {part.exerciseCount} <br/>
                Project Count: {part.groupProjectCount}
              </p>
            </div>
          )
        case 
          "background":
          return (
            <div>
              <p>
                {part.name} {part.exerciseCount} <br/>
                <em>{part.description}</em><br/>
                Background material: {part.backgroundMaterial} <br/>
              </p>
              </div>
          )
        case "special":
          return (
            <div>
              <p>
                {part.name} {part.exerciseCount} <br/>
                <em>{part.description}</em> <br/>
                Required skills: {part.requirements.join(", ")}
              </p>
            </div>
          )
        default:
          return assertNever(part);
      }
  }
  const Total = (props: TotalProps) => {
    return (
      <p>
        Number of exercises {props.totalExercises}
      </p>
    );
  }
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;