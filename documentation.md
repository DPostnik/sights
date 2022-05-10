<ul>

<li>
    <h3> To create an empty project you will need to execute init command </h3>
</li>

    npx sequelize-cli init
<li>
    <h3>Create model</h3>
</li>

    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
<li>
    <h3>Running Migrations</h3>
</li>

    npx sequelize-cli db:migrate 
<li>
    <h3>Undoing Migrations</h3>
</li>

    npx sequelize-cli db:migrate:undo
<li>
    <h3>Creating the Seed</h3>
</li>

    npx sequelize-cli seed:generate --name demo-user
<li>
    <h3>Running Seeds</h3>
</li>

    npx sequelize-cli db:seed:all
</ul>
