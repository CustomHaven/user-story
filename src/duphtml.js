const html = `
<!doctype html>
<body>
  <main class="flex">
  <h1>User Stories Form</h1>
  <section class="modal-dialog">
    <form class="flex" method="POST" onsubmit="handleSubmit(); return false" class="flow" action="">
      <div class="grid input-grid">
        <label class="label special-font" for="name">Name:</label>
        <!-- First and Surname (should have been specified on the user stories) -->
        <input class="text-input special-font" type="text" name="name" id="name" placeholder="Enter Your Name"/>
        <!-- <p>Enter a correct name</p> -->
      </div>
      <div class="grid input-grid">
        <label class="label special-font" for="email">Email:</label>
        <input class="text-input special-font" type="email" name="email" id="email" placeholder="Enter Your Email"/>
        
      </div>
      <div class="grid input-grid">
        <label class="label special-font" for="card">Card:</label>
        <input class="text-input special-font" type="text" name="card" onkeyup="luhnAlgorithm(this)" id="card" placeholder="Enter a Proxy Credit Card Number"/>
        <img hidden src="./assets/other.png" id="imgCard" style="padding:5px;" />
      </div>
      <div>
        <input id="submit" type="submit" value="Submit" />
      </div>
    </form>
  </section>
  </main>
</body>
`

module.exports = html;