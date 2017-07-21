export class Snippet {
    public static SETTING_JUNGLE:string = "setBackground(\"jungle\");\nplayMusic(\"jungle\");";
    public static SETTING_SPACE:string = "setBackground(\"space\");\nplayMusic(\"space\");";
    public static SETTING_SEA:string = "setBackground(\"underwater\");\nplayMusic(\"underwater\");";
    public static CREATE_JUNGLE:string = "var a = makeMonkey();\nvar b = makeElephant();";
    public static CREATE_SPACE:string = "var a = makeSpaceShip();\nvar b = makeAsteroid();";
    public static CREATE_SEA:string = "var a = makeShark();\nvar b = makeFish();";
    public static ACTION_JUNGLE:string = "a.jump();\nb.trumpet();";
    public static ACTION_SPACE:string = "a.shoot();\nb.float();";
    public static ACTION_SEA:string = "a.eat();\nb.swim();";
    public static LIST:string[] = [
        Snippet.SETTING_JUNGLE, //0
        Snippet.SETTING_SPACE, //1
        Snippet.SETTING_SEA, //2
        Snippet.CREATE_JUNGLE, //3
        Snippet.CREATE_SPACE, //4
        Snippet.CREATE_SEA, //5
        Snippet.ACTION_JUNGLE, //6
        Snippet.ACTION_SPACE, //7
        Snippet.ACTION_SEA //8
    ];
}