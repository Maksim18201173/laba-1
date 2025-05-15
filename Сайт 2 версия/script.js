// Данные приложения
let currentUser = null;
const adminCredentials = {
    email: "dorofeewo18@gmail.com",
    password: "dorofeewo18201173"
};

// Инициализация данных
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

if (!localStorage.getItem('products')) {
    const initialProducts = [
        {
            id: 1,
            name: "Яблоки",
            description: "Свежие яблоки сорта Голден",
            price: 89.99,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIVFRUVFhYYGRgXFxgVGBgXFxcXGBgWFxUaHSggGRonGxgYITEhJSkrLi4uGB8zODMsNygtLi0BCgoKDg0OGxAQGzcmICYtLS0tMS01LS0tLS0tLS0tLS0tKy0tLS0tLi0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMQBAQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xAA9EAABAwIDBQYFAwMDAwUAAAABAAIRAyEEMUEFElFhcQYigZGh8BMyscHRQuHxFCNSB2KSM7LCFVNygqL/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAwQBAgUG/8QALREAAgIBBAIBAgQHAQAAAAAAAAECAxEEEiExBUETIlEyYZGhFDNCUnHR8CP/2gAMAwEAAhEDEQA/AO4IQhACEIQAhCEAIQlQCISoQCISoQCISpEAIQlQCISoQCISoQCISoQCISoQCISpEAIQhACEIQAhCEAIQhACEIQAhCVACEIQAhCEAITVTEsb8z2jqQPqo1PbGHcSBXpmP9wWjnFPDYJyEjXAiQQQdRdKtwCFle3Pah2CpgsALiYuCedgM1pcJULmMc5u64taS3gSASPArVSTbSNnFpJsdQhC2NQQhVuOxpu2n4u4dFhvBvCDm8Ik4rH06fzOvwFz5Ktr9oWjJv8AyMeiq6rN0EnvE+ZVBtau+J3TCjczoV6OD75NBiO1xboFFPb0DNo+i5xtPaDhJ18SqT+sdUJ7wtxMD91r82C9HxKkspHY2f6h09WT0P7K32d2wwtW2/uHg78hfPIx5kSVLpY902JgnLXks/KRz8SvR9MseCJBBB1FwvS4Z2c7WVqB7tQxqx1x5LrHZ3tLSxTRB3Xxdp+rTqpFJM5d+ksq7XBdoQhbFYEiVCARCEIAQhCA...Y0E5SqIGJMXPvNTS/dsYkmTF+t1BKD9ElsvkWGX+Lxu6CZknTgJ1XnCYoFs5GL+aoW1jUcX5NFgPQfcp+nioBW0Iv2VXSlHBd1Y3jF4AP2K8UgHWJsdVTf1J7vO08krMW5sOyBm/4W+Aq3jsvsFirQMzIK0/ZbCEuLj+n6mw+iw2xwXOIjmur7Iwnw6YBzNz1Oit6aHOTi+VsVcdi7ZMAXsJAvSus86BQhCwAQhCAEIQgBCEIBUJEIBUJEqAEhCVCAbcxMvoBSkhCzkzkr34UJh+EVqWrwWLJtkpnYNMYjZ4cCFemmvBpJ2bRm08o5ltXZzqZIIjmqGq09B6ei6/tDAMqN3XDx1Cw+2uzj2SW95vIX8VXnV7R2NP5DKxLgxb3D9U/VNs1NrCcwPZU7F0SLEfyoDqahcDqV3p+wa7rEyGzMc1KoU97vOy1g393UN4sLZ6pf6kjPoR00hQyjnouRmSmPDRyEm3HRMvxEjIXj8Jpld2QJF58l6osl2VgsKGDZzRNcwdwDODpl7lLRoGQ2/wCNTZS9n4R7zDGklwiOXP8AC2mw+y7WQ6rBP+OYnmeHJb11SkU9T5Cuhd5YvZHYpB+PUGfyjjzW0YVGYFJphX4RUVhHk9RdK6e6Q6EqQJVkgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIASpEIASQlQgEheSF7Qs5M5GXsULEUFZwvDmJkzkx21dkNfm0Tx1WVx/Z4j5fVdUqYYFQ62zQdEcU+yaF84dM45iNkvGnko/8A6Y8/phdeq7FB0TB2EOC0+KJY/j7cYyczw+wyTcQFotl7BYIJE+n0Wtp7GA0Umls+NFlVx+xHLV2y/qI2Aw7WCGtDeghWdMJaeGhSGUlsVmwY1SGhIxi9gIasUIQhYMAhCEAIQhACEIQAhCEAJUIQCIQhACEIQAhCEAIQhACEIQAhCEAJIQhAJupN0IQsgN0I3UIQChqWEiFgHpCEIAQhCAEIQgBCEID/2Q=="
        },
        {
            id: 2,
            name: "Бананы",
            description: "Спелые бананы из Эквадора",
            price: 129.99,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhMTEhIVEhUVFhcVGBUVFRUQFxcVFRcWFhUSFRUYHiggGBolGxUVIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lICUtLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKYBLwMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgYBB//EADoQAAIBAgQDBQYFBAEFAQAAAAABAgMRBBIhMQVBUQYiYXGBEzKRobHRQlLB4fAUI2JykhUzQ4LxB//EABsBAQADAQEBAQAAAAAAAAAAAAACAwQBBQYH/8QAMhEAAgIBAwMCBAUEAgMAAAAAAAECEQMEEiEFMUETUSIyYXEUgaGx0SORweFC8CRSkv/aAAwDAQACEQMRAD8A/cQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADO4pxuhh2o1Jd5q6ik5O2130V+pXPLGHcshilPsVqXaag3aWan0ckrP1i3b1KYazFJ12LJaaaVmvRqxmlKMlJPZxakvijSnZnao7OgAAAAAAAAAAAAAAAAAAAAAAAAwO2HaL+ipKUYxqVJNWpuWV5E1nqW3aV1t1RCUqJwjuMTs//wDoKxEpNwg6XdUXTlKTvlTk7ySzK76LbmefqepR081GaLo6fcriz2ODx1Oqu5JPw2fwNWn1eHOrxyv9ymeOUO6LJpIAAAAAAAAAAAAAAAAAAAAqcQxThF5UnK10n+pi1mqeGD2K5exOEdzPzjj8alX++pd6+uu9raW6aHh6XXPLzlfLN0aiqRWweOc7uSyqKS8PMvyql8JphJM2OyVdwxNNRbSqqWeP4XpeMrfm...SRmVuIuatTTfo4r5kHyTSPZ8JwzdCk3vkV/O2vzNccdxTM0pVJlh4VPci8UX3OqbI48PS2bKlpUvJL1SaFGysWqFKiLlZJFpLoWwVIg2U8XxBLSL9STl7HKLnA53Un5fqacPYrmaheQAAAAAAAAAAAAAAAAAAAAAOZMrlL2OpEbKGmyRy0R2M7YyHPTO2cygQeNBMgnQi+RW8CZNTaK88HHoiP4aJP1WQT4anskQekiTWdlapwWL3v6aFT0SZNapknDuGxpTzR0e3pzRfp9Msb4IZc29Uzasa3Ez2LHUjjMPjmKpxazSS8OfwWpRmlGy3HFnmsRjKlTSmsq6vf0X3MrbZelXc6ocKcnebcn4/p0Oxx2ccqNfD8MS2iXxxfQrcz0OCjaMV0RohwqKZEs2krkuKs5yRTq2RF0d5KTxbzW2K3J2TrgoYutJvci7Z1FKcr8+Z2uDh6fgC7j9PobMPylE+5qFxEAAAAAAAAAAAAAAAAAAABgHNiDR0+ZTm07YyjaLPjRHaLOXE5tO2fHTObBZ8VIbBYdM5sFnx0R6Ys+exOqAs7UCaRyyOtSk1pJx8rEZY77Ojql7mPPs8m7t3b5vV/Ezfg1dl3rlmhwOCLY6ZIg8rZbhgIrkWrEkRc2TRw6JbSNnCjZlLVMnZxV2OeAVMQ9CLJIzHLvr1+hXXJIrV5XAKlSbvG+izc/wCdAzh6ns6/7fma8K+Epl3NguIgAAAAAAAAAAAAAAAAAAAAAAHAAD5YUBYUBYUBYUBYUBYUBYUBY6D6ALAAAWAPlgDiUCLjZ2yvXpu2mpTKDrgkpFHERf5WVuL9iaaMxUamZv2crWfRb+pFQl7Ety9yKfDa0npBJf5St9LnVimc3RLOE7NXalVlma5LSK9OfqWxw+5Bz9j0mHoqKsi9IrJToAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8aAOXTRygPZIUD6oIUD7Y6D6AAAAAAAAD//Z"
        },
        {
            id: 3,
            name: "Молоко",
            description: "Молоко 3.2% жирности, 1 литр",
            price: 75.50,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEBANDQ4NDg8OEA0NDw0NDg8ODQ0NFREWFhURFRUYHSggGRolGxUVIjEhJTUrLi4uFx8zODMsNygtLisBCgoKDg0OFRAPFSsdFR0tKy0rKystKystKysrLSsrNy03Ky0rLSsrLTcrKysrNzctKysrLTcrNys3Kys3LSstK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgQBAwUGB//EADsQAAIBAgMEBwYDBwUAAAAAAAABAgMRBCExBRJRkSJBYXGBobETMlJywdEUM0IGI0OCsuHwFVNikqL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUsRtOnCW41Jy0dllfW131gXQVaePpy0bvwad+RvVWPG3emvUCYI+0jxXNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABR2jh7xc0le27Li49T719y8YaurccgONRh3d3B9pYp20V18rt6FaH5rg96VtLt7q6joxorg+YohZ8Zc7+pjPi/FR+xucO/mY3OyXNfcitUqrX6vJ/crTx0lpLy+9y7KiuD5nN2lSUINq8ere1tfsKi9gMXKo2mskr72ngXijsiK3Lp3bdn4F4AAAAAAAAAAAAAAAAAAAAAAAAAAAABGbsm+CbA5OFd6jZ1InJ2ZHpSb7Lcl9TrRAxIwjMmRuRWxvI5+0VeD5l1lHH3srcbBGjD4a76FSUP3cb7smrO6by8LeJvhhKq93EVP5mpeqZW2fh5ylffaTbbtru9HJeK8zrrDpaOS7b3LSNNL...dz9CZCt7su5+gCk8kYmYoPoruQmBVqGiZvqFeoSq09ZmmQuTpEFqmjaa4GwqBGRlkJMDTVZxds1rRcbN7yldLWyX3sdesznYKiq2MUZK8aVP2jT0b3rJPxtyCruwIznRp7tNUYbsc7NN5aRi/V+Z3KcFFWRIFQAAAAAAAAAAAAAAAAAAAjU0fc/QkYksmBqoaLuMzI4fREpgVahWqssVGVqpFV2ydNmibzNsZEF6DJ3KtOobVMqNrZqnIOZXq1ANWJnkbv2bw/5ld/xGoR+SF8+bfI51ZynJU4e9N7q7O36nqMPRVOEacdIpRXh1iK2AAqAAAAAAAAAAAAAAAAAAAAACrhpXimidQ4OGhWozq2lJw3m4wuptdLNK9rdzvqXpY2ejpz01STXO5UbplasVcRtbde64tPtTtzORtH9ooQy36bfwqUVL/1Yyrp1ZWz5lSO0qUvdqQfdJHnf9Wr4mfsqVKUUmlUnUlGKjBvOyTbbt9C4tlwi703Uh/x3rx8xg7tLFLiWY4k87DBzTuqke9003zbNjoV3/Gjbh7GDfMmDuyxJTxOMS1aXUs9Wc2WzJSylUn/ACJRN2C2JSpvfUW5/HNuUvPQuD0uxcDufvan5klZL/bj9zrnL2VUf5cur3W+HA6hQAAAAAAAAAAAAAAAAAAAAADDMgDm4um3ezs7rNcCooSi+C7DsbhCVFFHndpUFVld0otJWSmr+OpGlhYJNfh6d2rK8Y2XI9C8OjH4ZEweeobL3W3FJOT6Ttm+99Zbjs47CoozuFHI/AGVgew624NwDmxwZtjhi8qZlUwKsKVmmtVmdCLurkFAnFEGQAAAAAAAAAAAAAAAAEYAAGQMAyAMGLEgBCwsTMARsN0mYAjuixIAYsZsZAGAAAAAAAAAAARkAAAAAAAIwZAGAZAAAAAAAAAAAAAAAAAGAZAGAZAGAZAGAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z"
        },
        {
            id: 4,
            name: "Хлеб",
            description: "Белый хлеб нарезной",
            price: 45.00,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMSFRUVFhkXFxcSFRoZFxYTFxcYFhgWGBcaICggGBsoGxYVITIhJSorLi4uFyAzODMsNygtLisBCgoKDg0OGxAQGyshICUtKy0tLSsyLy0vMzItLy81Ly8tNS0rLy8vMDIvLS0vKzc1LSsrMC0yLy0vNzUrLS0rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABAUGAwcCAQj/xAA9EAABAwIEAwYDBQcDBQAAAAABAAIRAyEEEjFBBVFhBiJxgZGhEzLBQlJisdEUIzOi4fDxU5KyJUNygsL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/8QALxEAAgIBAwEFBwQDAAAAAAAAAAECAxEEEiExEyJBUfAFFDJhcYGhkbHR4SPB8f/aAAwDAQACEQMRAD8A9xREQBERAEREAREQBc31gN10VXUeASCh6lkkvxJ2UepxMM+Yt8zfQlZ7jPEnAD4Z1N3Nt0A5qlJLpzEnvC/rKxdd7WVEtkVl/g0KNFvjul0N7R4vTcWiRLpgb2E6KwBXltDHwRUEgwQzLtBgmfOPNejcFrmpQY92pF/U3+qk9ne0XqW4SWGvX7ker0nYpSXQmoiLWKQREQBERAEREAREQBERAEREAREQBERAEREAREQBERAFWcX4eaglpjm2LO8ecct1ZojPU8PJgOOUACwh0loIMHUAg3A01KqsdWDGVSPuFw9I/MrX9p+EWdWp6gXYAe94Rv0WC4jha5psAZVDS8/EAbf4X3b3b3ryI08F8r7R0ds9TlReHz5r8fQ3NJfDsuWfvAsL8Y06bdTIgbNDiZPK17r12hSDGho0aAPRU/ZXgTMNTBiajwMxI+Ua5B0HvHgrxbeg0aoi2+suv8GdrNT2skl0QREV8phERAEREAREQBERAERE...j109FYgQtOj2Zzusf2RTs1iXEP1IOB4Wync953M7eAU9EWrCuMFiKwihOcpvMmERF2chERAEREAREQBERAEREB+OKouOuJc1suAykyBMOMgOPhH8yvHKs4tRLmyyA9t2zoebT0P6a6KDUQcq2kTUSUZpsrK2Gs2QMwG2kkCSPcKixtOCJ3tzl0TfrYq84fj2VZsQ5tnNdZzZmRrzUmphWu/uRZUJVxtjmJcU3W8M89xzCDImTcAN7x/Dm8jZWmB7VvYLkOb+M3HmrytwNpJgnzPtAER7qpxXZ1+oyu6keG/vyVGWntre6GfsXI312LEy8wHaajUgO7hI30PgdfZWLqNOqNj4FefM4VXaSCwiCbjQ9bXny21X1gGVG1HQT802JkA3vG3Xw8F1HXWLu2Rz+P6OXo63zXLBosd2VBdnpmHjQixjkeYXPB4rvOoVozt/mabhw6G/oeSm8IOIqaOMbk6Dz3PRWVPs1TNT41TvVIiSLhovE8pJPmrNVXbLdCLS+fQgnZ2fdm8/TqZ/8AZyHZWgm9o3CscHwSo65ho2nWFo8LgWU/lb5m59SpK7o9k1x5nz8iKzXyfw/qV+E4RTZeMx5n9FPAX6i04VxgsRWCjOcpvMnkIiLs5CIiAIiIAiIgCIiAIiIAiIgCIiALjWpSuyIDG8d4K4vFWkSyoNY0cOTv1/NVeF7Rvpuy1mkOBjT5h477XXob6YKreIcBo1hFRgPluqV2k3PdB4Zcq1SS2zWUVNDjdI3zxOxEQVJHEaW9RmvNV7+wTAf3dV7R913eHv8AqpGG7HBpE1XEDYCLdBMKHZqlxhP19SbOmfO5r19CT+1hzg1gzE6R+ZKn4ThDG95wDneylYPBMpCGNA5nc+JUhWqqGu9Zhv8ACKtl3hDhH4Av1EVkrhERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB//2Q=="
        },
        {
            id: 5,
            name: "Яйца",
            description: "Яйца куриные, 10 штук",
            price: 95.00,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIVFRUVFRcVFRYVFxUXExUVFRUWFhUXFhUYHSggGBslGxUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGhAQGy8lIB8tLS0uKzcrLS0tLS0tLS0tLS4tLS0rLS0tLS0tLi0tLS0tLTctLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQCBQYBB//EAD0QAAIBAgIGBwUGBQUBAAAAAAABAgMRBCEFBhIxQVETImFxgZGhMlKxwdEUM0JykuEHI1NigiRjc7LwFv/EABkBAQADAQEAAAAAAAAAAAAAAAABAgQDBf/EACURAQEAAgIDAAICAgMAAAAAAAABAhEDBBIhMUGRE1EUsWGB4f/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHUrRj7Uku9pASAqvSVH+pHzJaeJhL2Zxfc0R5T+0+N/pKACUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAV8bjYUlebtyXF9yItKaQjRjd5t5RXN/Q42vXlUk5Td2/JdiXBGfm55h6n1q6/WvJ7vxtcZp2pPKPUXZ7T8eHgaxzvm83zZGe3MGXJll9r0sOHHCeokueXMHIx2iu6t4trgtM1KeT68eTefgzpcFi4VY7UH3rinyZwcpk+j8e6U1NZ8JLmuKNHF2LjdZfGbm6sym8frvQR4avGcVOLupK6JD0XlfAAAAAAAAAAAAAAAAAAAACrj9IU6KvOSXJfil3LiRbJN1Mlt1FoHH4rWqo3/LjGC7etL6L1Kz1hxHvr9MfoZ72uONc6XLZ+HcmM5JJtuySu3ySOG/8A...acVntPfUguN+K8eZp8FpG6PqRpdLas0K8ttpwnxnTsm/zK1pd7VzdycF35Yfpg4+xNeOf7cxTxPaSfaCxiNUK8fuqsJLlNSg/NbV/QhWreM5U/1u3/AFOWuSetO3lx38o5VyGeJNpQ1SrP7yrCP5VKT83Y2uD1WoQd5bVR/wB7Wz+lJJ+NyZx8mX40reXix/O3OaPwVXEPqK0eM37K7vefYvQ7TR2joUY2gs37Un7Un2/QtRVskemnj4ph7/LLyc1z9fIAA6uQAAAAAjr0Yzi4ySafBnP4zV+au6clJe68n57n6HSArlhMvq+Odx+OCxGFrRydKp4RbXnG6K/2avL2aNR/4SS82rH0UHG8H/LtOzf6cJh9VcRU9txpLt68vKLt6nS6F1fo4bOCcptWc5Zya5LhFdi8bm2BfDhxxu3PPnzz9X4AA6uT5lrRo37NWsvu6l5Qy3Z5w8L+TRqumPq2lNHU69N06iunuf4ovhKL4M+Xad0FXwudRbUG8qkb7PZte6+x+DZ5fY4bhfKfP9PY6vYmcmOV9/7VpYgjdcqOoRTqmO5N2lydYrVKhHRU5yUIRcpPdGKbb8Edxq5qFJtVMZbZVmqUXdyf+5JcOxPPnwc4cWfLdYxz5ebDim8qh/h7q+6k1iqsepD7pP8AFPdt25Lh258D6SYwgkkkkklZJZJJbkkZHtcPDOLHxjw+fmvLn5UAB1cQAAAAAAAAAAAAAAAAAAAAAAAAAADyUU001dPJp7mj0AaHFan4Kd/5Ki279SUo+STsvIho6jYGObpyl+ac36JnSA5/w8d9+M/Tr/Pya15X9qmj9G0aC2aNOMFx2Uk33ve/EtgF5JPUc7bfdAASgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z"
        },
        {
            id: 6,
            name: "Картофель",
            description: "Картофель молодой, 1 кг",
            price: 39.99,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFhUWFxgXFhYYFxcWFRgXFxcWFxgXFxUaHSggGBolHxUVITEhJykrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUvKy0yMC8tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADkQAAIBAgMFBwMDAgYDAQAAAAABAgMRBCExBRJBUWEGcYGRobHwIsHREzLhFEIVUnKCovEHktJT/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAMEAQIFBv/EACURAAICAQQCAgMBAQAAAAAAAAABAgMRBBIhMRNBIlEFMmFxFP/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ZBr7SSyjm+fD+SOy2NazJm0YuTwidc1SxUF/cvcpa+JcnnJ92iNEp2yKFn5FL9UWY6VvtnRU68ZaNM2nNRvrmScPtVxdpXa9V+SSrXxl+3BrPTNdcl4DClUUkmndPRmReyVj0GLkgpIZQMgeXPTIAAAAAAAAAAAAAAAAAAAAAAAAAAAKnbWMtanF5vN938kGBDxVZSxNRXs+H+20fsb6cpWzeb0Z57VWuyx56XB0669sESP0s8zGaz0y5m2U8jXO7INqwZTZrzV+RAxdTg+OngWF+DKvbMFZdHcin8Vknr5eCX2a2m41f0pP6J5w1ykldrPS6TfeupcbR2hnuRfe17I4bBS3qmb/baXlp6l5TTbuldO18+uflmW4a+XhUF2RWaaPk3MsFn178zXUgtHdN30uvYzowT...MtUUrtMplqu/BzLx9K2VSH/svyVG09rUY/VKtFLlvJ+Vs2W+0ex8JXy9CgxPYaPxHOno3nlFyF8fs56n2pjVxdGnCP0Ook5yVtclurvtm/I+h4Wo7p6cDlafYuMWpK907p8ms0zqqObvo+K+dxHqKNsU4rBLG1SeDoaMlkzOpUVyvw9VJW5GbrEXk4InXyS69dJXNNSplfj4XNCrX6mqrPeepiU2ZjA2zrb0SvxbUYSk+Cbu3pZM233bJcOBB2unOk6aunNWfSL1XjmjNcHZJI2bUVk+Sdm+1Kp1n+rdQnNyUs/pbbefTM+q4HERqRUoyUk9Gmmjk6/wD4/UtLrwNOG7E16LvRqzh/pbSfetH4l+7SxnzjDNVevs+gQ+Zm2tUSjmcthobQgrb0JdZU8/8Ai0SJU8dPJqku6E//ALKn/LJdIy7F9lgsUm7Ik43aMacUtZPSN8358CLgtkYp5SlCP+mGfnJsucB2ajF70rylzeb/AIJ6dDLtkVmoiV2Bw0qkt6zSv5/hHVYHB2sScNgkuBOhCx1KaI1rCKNtrm+RTjZGYBaIQAAAAAAAAAAAAeNHoMYBqnRTItbBInnjRq4mVJlDXwJVYnCWe9y9jrqlK5XYvAt6IisqUotMlhZh5OfjdGM5kmvgqsdKcpLosyLVp1P/AMKz6Km/fQ4tmknF4SOhG6L7Z7Gt7mvEYqMbtuy5mtYfES0w1RdZ5ei4+JLw/Z+cnepF36rJG1WjnLtGJXxRXUKsqr+lWXMvcHs1Fjg9lbvAsqdCx1KdPGvop23ORFo4BWNv9BElpHpa2lfcyH/QRM1g4rgSQNqG5mqNBIyVMzBnajGTxI9AMgAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
        }
    ];
    localStorage.setItem('products', JSON.stringify(initialProducts));
}

if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
}

// Функции для работы с данными
function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

function getProducts() {
    return JSON.parse(localStorage.getItem('products'));
}

function getOrders() {
    return JSON.parse(localStorage.getItem('orders'));
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Функции для работы с пользователем
function loginUser(email, password) {
    const users = getUsers();
    
    // Проверка админских учетных данных
    if (email === adminCredentials.email && password === adminCredentials.password) {
        currentUser = {
            name: "Администратор",
            email: adminCredentials.email,
            isAdmin: true
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    return false;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
}

function registerUser(userData) {
    const users = getUsers();
    
    // Проверка, что пользователь с таким email уже не существует
    if (users.some(u => u.email === userData.email)) {
        return false;
    }
    
    // Генерируем ID для нового пользователя
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const newUser = {
        id: newId,
        ...userData
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Автоматически входим после регистрации
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return true;
}

// Функции для работы с DOM
function loadPage(page) {
    window.location.href = `${page}.html`;
}

function updateNavMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;
    
    navMenu.innerHTML = '';
    const ul = document.createElement('ul');
    
    // Всегда показываем эти пункты
    const pages = [
        { id: 'index', name: 'Главная' },
        { id: 'about', name: 'О нас' },
        { id: 'products', name: 'Продукты' }
    ];
    
    // Добавляем основные страницы
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = page.name;
        a.onclick = () => loadPage(page.id);
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    // Проверяем, авторизован ли пользователь
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
        // Если пользователь администратор, добавляем ссылку на админ панель
        if (user.isAdmin) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = 'Админ';
            a.onclick = () => loadPage('admin');
            li.appendChild(a);
            ul.appendChild(li);
        }
        
        // Добавляем корзину и выход
        const cartLi = document.createElement('li');
        const cartA = document.createElement('a');
        cartA.href = '#';
        cartA.textContent = 'Корзина';
        cartA.onclick = () => loadPage('cart');
        cartLi.appendChild(cartA);
        ul.appendChild(cartLi);
        
        const logoutLi = document.createElement('li');
        const logoutA = document.createElement('a');
        logoutA.href = '#';
        logoutA.textContent = 'Выход';
        logoutA.onclick = logout;
        logoutLi.appendChild(logoutA);
        ul.appendChild(logoutLi);
    } else {
        // Если пользователь не авторизован, показываем вход и регистрацию
        const loginLi = document.createElement('li');
        const loginA = document.createElement('a');
        loginA.href = '#';
        loginA.textContent = 'Вход';
        loginA.onclick = () => loadPage('login');
        loginLi.appendChild(loginA);
        ul.appendChild(loginLi);
        
        const registerLi = document.createElement('li');
        const registerA = document.createElement('a');
        registerA.href = '#';
        registerA.textContent = 'Регистрация';
        registerA.onclick = () => loadPage('register');
        registerLi.appendChild(registerA);
        ul.appendChild(registerLi);
    }
    
    navMenu.appendChild(ul);
}

function logout() {
    logoutUser();
    updateNavMenu();
    loadPage('index');
}

// Функции для страницы продуктов
function loadProducts() {
    const productsContainer = document.getElementById('products-list');
    if (!productsContainer) return;
    
    const products = getProducts();
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">${product.price.toFixed(2)} руб.</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Проверяем, является ли пользователь администратором
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const adminControls = document.getElementById('admin-controls');
    
    if (adminControls) {
        if (user && user.isAdmin) {
            adminControls.style.display = 'block';
        } else {
            adminControls.style.display = 'none';
        }
    }
}

function showAddProductForm() {
    const modal = document.getElementById('add-product-form');
    if (modal) modal.style.display = 'block';
}

function hideAddProductForm() {
    const modal = document.getElementById('add-product-form');
    if (modal) modal.style.display = 'none';
}

function addNewProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value || 'https://via.placeholder.com/300x200?text=No+Image';
    
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name,
        description,
        price,
        image
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    hideAddProductForm();
    loadProducts();
    document.getElementById('new-product-form').reset();
}

// Функции для работы с корзиной
function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }
    
    saveCart(cart);
    updateCartCount();
    alert(`${product.name} добавлен в корзину!`);
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems > 0 ? `(${totalItems})` : '';
    });
}

function loadCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    const cart = getCart();
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пуста</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.price.toFixed(2)} руб. x ${item.quantity} = ${itemTotal.toFixed(2)} руб.</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateCartItemQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                </div>
                <span class="remove-item" onclick="removeFromCart(${item.productId})">&times;</span>
            </div>
        `;
        
        cartContainer.appendChild(cartItem);
    });
    
    document.getElementById('total-price').textContent = total.toFixed(2);
}

function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const cart = getCart();
    const item = cart.find(i => i.productId === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        loadCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.productId !== productId);
    saveCart(newCart);
    loadCart();
    updateCartCount();
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Пожалуйста, войдите в систему для оформления заказа.');
        loadPage('login');
        return;
    }
    
    const orders = getOrders();
    const newOrderId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = {
        id: newOrderId,
        userId: user.id,
        userName: user.name,
        date: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'Новый'
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    
    // Очищаем корзину
    saveCart([]);
    updateCartCount();
    
    alert(`Заказ #${newOrderId} успешно оформлен! Сумма: ${total.toFixed(2)} руб.`);
    loadPage('index');
}

// Функции для страницы администратора
function loadAdminUsers() {
    const usersTable = document.getElementById('users-table');
    if (!usersTable) return;
    
    const tbody = usersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    const users = getUsers();
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address || '-'}</td>
            <td>${user.phone || '-'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editUser(${user.id})">Редактировать</button>
                <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Удалить</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function loadAdminProducts() {
    const productsContainer = document.getElementById('admin-products-list');
    if (!productsContainer) return;
    
    const products = getProducts();
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">${product.price.toFixed(2)} руб.</span>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">Редактировать</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Удалить</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

function loadAdminOrders() {
    const ordersTable = document.getElementById('orders-table');
    if (!ordersTable) return;
    
    const tbody = ordersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    const orders = getOrders();
    
    orders.forEach(order => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.userName} (ID: ${order.userId})</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.total.toFixed(2)} руб.</td>
            <td>${order.status}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editOrder(${order.id})">Изменить статус</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function openAdminTab(tabName) {
    // Скрываем все вкладки
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Убираем активный класс у всех кнопок
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    // Добавляем активный класс к выбранной кнопке
    event.target.classList.add('active');
    
    // Загружаем данные для вкладки
    if (tabName === 'users') {
        loadAdminUsers();
    } else if (tabName === 'products') {
        loadAdminProducts();
    } else if (tabName === 'orders') {
        loadAdminOrders();
    }
}

function editUser(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    const newName = prompt('Введите новое имя:', user.name);
    if (newName === null) return;
    
    const newEmail = prompt('Введите новый email:', user.email);
    if (newEmail === null) return;
    
    const newAddress = prompt('Введите новый адрес:', user.address || '');
    const newPhone = prompt('Введите новый телефон:', user.phone || '');
    
    user.name = newName;
    user.email = newEmail;
    user.address = newAddress;
    user.phone = newPhone;
    
    saveUsers(users);
    loadAdminUsers();
}

function deleteUser(userId) {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return;
    
    const users = getUsers();
    const newUsers = users.filter(u => u.id !== userId);
    
    saveUsers(newUsers);
    loadAdminUsers();
}

function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const newName = prompt('Введите новое название:', product.name);
    if (newName === null) return;
    
    const newDescription = prompt('Введите новое описание:', product.description);
    if (newDescription === null) return;
    
    const newPrice = parseFloat(prompt('Введите новую цену:', product.price));
    if (isNaN(newPrice)) return;
    
    const newImage = prompt('Введите новый URL изображения:', product.image);
    
    product.name = newName;
    product.description = newDescription;
    product.price = newPrice;
    product.image = newImage || product.image;
    
    saveProducts(products);
    loadAdminProducts();
    loadProducts();
}

function deleteProduct(productId) {
    if (!confirm('Вы уверены, что хотите удалить этот продукт?')) return;
    
    const products = getProducts();
    const newProducts = products.filter(p => p.id !== productId);
    
    saveProducts(newProducts);
    loadAdminProducts();
    loadProducts();
}

function editOrder(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const newStatus = prompt('Введите новый статус заказа:', order.status);
    if (newStatus === null) return;
    
    order.status = newStatus;
    saveOrders(orders);
    loadAdminOrders();
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли сохраненный пользователь
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    // Обновляем меню навигации
    updateNavMenu();
    
    // Загружаем продукты, если находимся на соответствующей странице
    if (document.getElementById('products-list')) {
        loadProducts();
    }
    
    // Загружаем корзину, если находимся на соответствующей странице
    if (document.getElementById('cart-items')) {
        loadCart();
    }
    
    // Обновляем счетчик корзины
    updateCartCount();
    
    // Инициализируем админ панель, если находимся на соответствующей странице
    if (document.getElementById('users-table')) {
        loadAdminUsers();
        // По умолчанию открываем вкладку пользователей
        document.getElementById('users-tab').style.display = 'block';
    }
    
    // Обработчики форм
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (loginUser(email, password)) {
                alert('Вход выполнен успешно!');
                updateNavMenu();
                loadPage('index');
            } else {
                alert('Неверный email или пароль!');
            }
        });
    }
    
    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const address = document.getElementById('register-address').value;
            const phone = document.getElementById('register-phone').value;
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }
            
            const userData = {
                name,
                email,
                password,
                address,
                phone
            };
            
            if (registerUser(userData)) {
                alert('Регистрация прошла успешно!');
                updateNavMenu();
                loadPage('index');
            } else {
                alert('Пользователь с таким email уже существует!');
            }
        });
    }
    
    if (document.getElementById('new-product-form')) {
        document.getElementById('new-product-form').addEventListener('submit', addNewProduct);
    }
});